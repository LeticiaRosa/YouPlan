import { useState } from "react";
import { ScheduleContext } from "./ScheduleContext";
import { searchVideos } from "../api/services/videoService";
import { getVideoDurations } from "../api/services/youtubeService";
import { VideoEvent } from "../components/VideoSchedule";

export interface ScheduleProviderProps {
  children: React.ReactNode;
}

export type TermsSearchType =
  | {
      id: number;
      name: string;
    }[]
  | null;

export type DayOfWeek =
  | "Mon"
  | "Tue"
  | "Wed"
  | "Thu"
  | "Fri"
  | "Sat"
  | "Sun"
  | string;

export interface MinutesPerDay {
  day: DayOfWeek;
  minutes: number;
}

export interface MinutesPerDayParams {
  days: MinutesPerDay[];
  qtdeVideos: number;
}

export type ScheduleContextType = {
  listVideos: VideoEvent[];
  termsSearch: TermsSearchType;
  setTerms: (terms: TermsSearchType) => void;
  clearTerms: () => void;
  minutesPerDayParams: MinutesPerDayParams;
  setMinutesPerDay: (terms: MinutesPerDayParams) => void;
  executeGenerateSchedule: () => void;
};

export function ScheduleProvider({ children }: ScheduleProviderProps) {
  const [listVideos, setListVideos] = useState<VideoEvent[]>([]);
  const [termsSearch, setTermsSearch] = useState<TermsSearchType>(null);
  const [minutesPerDayParams, setMinutesPerDayParams] =
    useState<MinutesPerDayParams>({
      days: [
        { day: "Mon", minutes: 0 },
        { day: "Tue", minutes: 0 },
        { day: "Wed", minutes: 0 },
        { day: "Thu", minutes: 0 },
        { day: "Fri", minutes: 0 },
        { day: "Sat", minutes: 0 },
        { day: "Sun", minutes: 0 },
      ],
      qtdeVideos: 0,
    });

  const setTerms = (terms: TermsSearchType) => {
    setTermsSearch(terms);
  };

  const clearTerms = () => {
    setTermsSearch(null);
  };

  const setMinutesPerDay = (params: MinutesPerDayParams) => {
    setMinutesPerDayParams(params);
  };

  const getVideos = async (
    maxResults: number,
    termsSearch: TermsSearchType,
    accumulatedVideos: VideoEvent[] = [],
    pageToken?: string
  ): Promise<VideoEvent[]> => {
    if (maxResults <= 0) {
      return accumulatedVideos;
    }

    const batchSize = Math.min(maxResults, 50);
    const { videos: newVideos, nextPageToken } = await searchVideos(
      batchSize,
      termsSearch,
      pageToken
    );

    if (!newVideos || newVideos.length === 0) {
      return accumulatedVideos;
    }

    const updatedVideos = [...accumulatedVideos, ...newVideos] as VideoEvent[];
    const remainingResults = maxResults - newVideos.length;

    if (remainingResults <= 0 || !nextPageToken) {
      return updatedVideos;
    }

    // Passamos o nextPageToken para a próxima chamada recursiva
    return getVideos(
      remainingResults,
      termsSearch,
      updatedVideos,
      nextPageToken
    );
  };

  const getVideosWithDurations = async () => {
    const videos = await getVideos(minutesPerDayParams.qtdeVideos, termsSearch);
    const biggerDay = minutesPerDayParams.days.reduce((acc, day) => {
      return acc.minutes > day.minutes ? acc : day;
    });

    const listIds = videos?.map((video) => video.id);
    const durations = await getVideoDurations(listIds as string[]);
    const listVideosWithDurations = videos?.map((video) => {
      const duration = durations.find((duration) => duration.id === video.id);
      return {
        ...video,
        durationMinutes: duration ? Math.ceil(duration.durationMinutes) : 0,
      };
    });
    const videosFilterTime = listVideosWithDurations.filter(
      (video) => video.durationMinutes < biggerDay.minutes
    );
    console.log("videosFilterTime", videosFilterTime);
    return videosFilterTime;
  };

  const executeGenerateSchedule = async () => {
    try {
      const videos = await getVideosWithDurations();
      if (!videos || videos.length === 0) {
        return;
      }

      // Função para obter a próxima data para um dia da semana específico
      const getNextDayDate = (dayName: DayOfWeek, inicialDate: Date): Date => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const targetDayIndex = days.indexOf(dayName);
        const todayIndex = inicialDate.getDay(); // 0 = domingo, 1 = segunda, etc.

        let daysToAdd = targetDayIndex - todayIndex;
        if (daysToAdd <= 0) {
          // Se já passou, vai para próxima semana
          daysToAdd += 7;
        }
        if (daysToAdd === 0) {
          // Se for o mesmo dia, adiciona 7 dias para evitar agendar no mesmo dia
          daysToAdd += 7;
        }
        // Adiciona os dias ao dia atual
        // e retorna a nova data
        const targetDate = new Date(inicialDate);
        targetDate.setDate(inicialDate.getDate() + daysToAdd);
        return targetDate;
      };

      // Função recursiva para processar cada dia
      const processDayRecursive = async (
        remainingDays: MinutesPerDay[],
        scheduledVideos: VideoEvent[],
        inicialDate: Date
      ): Promise<VideoEvent[]> => {
        const videosUnused = scheduledVideos.filter(
          (video) => video.start === undefined
        ) as VideoEvent[];

        // Se não houver vídeos não agendados, retorne a lista atual
        if (videosUnused.length > 0 && remainingDays.length === 0) {
          remainingDays = minutesPerDayParams.days;
        }

        if (remainingDays.length === 0) {
          return scheduledVideos;
        }

        const [currentDay, ...otherDays] = remainingDays;
        let availableMinutes = currentDay.minutes;
        let updatedVideos = [...scheduledVideos];

        // Obter a data para o dia da semana atual
        const dayDate = getNextDayDate(currentDay.day, inicialDate);
        inicialDate.setDate(dayDate.getDate() + 1); // Avançar para o próximo dia
        // Horário inicial - começamos às 9:00 (ajuste conforme necessário).
        let currentHour = 9;
        let currentMinute = 0;

        let videosProcessed = false;

        do {
          // Encontrar próximo vídeo que cabe no tempo disponível
          const availableVideo = updatedVideos.find(
            (video) => !video.start && video.durationMinutes <= availableMinutes
          );

          // Se não encontrou vídeo adequado, passar para o próximo dia
          if (!availableVideo) {
            videosProcessed = true;
            continue;
          }

          // Criar datas de início e fim
          const startTime = new Date(dayDate);
          startTime.setHours(currentHour, currentMinute, 0);

          const endTime = new Date(startTime);
          endTime.setMinutes(
            endTime.getMinutes() + Math.ceil(availableVideo.durationMinutes)
          );

          // Atualizar hora atual para o próximo vídeo
          currentHour = endTime.getHours();
          currentMinute = endTime.getMinutes();

          // Atualizar o vídeo com horários de início e fim
          updatedVideos = updatedVideos.map((video) =>
            video.id === availableVideo.id
              ? {
                  ...video,
                  start: new Date(startTime),
                  end: new Date(endTime),
                  dayName: currentDay.day, // Mantemos o nome do dia para referência
                }
              : video
          );

          // Subtrair o tempo do vídeo do tempo disponível
          availableMinutes -= availableVideo.durationMinutes;
        } while (availableMinutes > 0 && !videosProcessed);

        // Processar o próximo dia recursivamente
        return processDayRecursive(otherDays, updatedVideos, inicialDate);
      };

      // Processar os dias da semana com os vídeos
      // Enquanto ainda existirem vídeos não agendados, continue a executar processDayRecursive
      const today = new Date();
      const scheduledVideos = await processDayRecursive(
        minutesPerDayParams.days,
        videos,
        today
      );

      // Filtrar apenas vídeos que foram agendados
      const removeVideosUnused = scheduledVideos.filter(
        (video) => video.start !== undefined
      ) as VideoEvent[];

      setListVideos(removeVideosUnused);
    } catch (error) {
      console.error("Erro ao gerar agenda:", error);
    }
  };

  return (
    <ScheduleContext.Provider
      value={{
        termsSearch,
        setTerms,
        clearTerms,
        minutesPerDayParams,
        setMinutesPerDay,
        executeGenerateSchedule,
        listVideos,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}
