import { useState } from "react";
import { ScheduleContext } from "./ScheduleContext";
import { searchVideos } from "../api/services/videoService";
import { getVideoDurations } from "../api/services/youtubeService";

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
  listVideos: any;
  termsSearch: TermsSearchType;
  setTerms: (terms: TermsSearchType) => void;
  clearTerms: () => void;
  minutesPerDayParams: MinutesPerDayParams;
  setMinutesPerDay: (terms: MinutesPerDayParams) => void;
  executeGenerateSchedule: () => void;
};

export function ScheduleProvider({ children }: ScheduleProviderProps) {
  const [listVideos, setListVideos] = useState();
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

  const getVideosWithDurations = async () => {
    const videos = await searchVideos(termsSearch);
    const listIds = videos?.map((video) => video.videoId);
    const durations = await getVideoDurations(listIds as string[]);
    const listVideosWithDurations = videos?.map((video) => {
      const duration = durations.find(
        (duration) => duration.id === video.videoId
      );
      return {
        ...video,
        durationMinutes: duration ? duration.durationMinutes : 0,
      };
    });
    return listVideosWithDurations;
  };

  const executeGenerateSchedule = async () => {
    let videos = await getVideosWithDurations();
    console.log("videos", videos);
    minutesPerDayParams.days.forEach(async (day) => {
      let totalMinutesDay = day.minutes;
      console.log("totalMinutesDay", totalMinutesDay);
      while (totalMinutesDay > 0) {
        const videosFiltreded = videos?.filter(
          (video) =>
            video.durationMinutes < totalMinutesDay && !video.isScheduled
        );
        const firstVideo = videosFiltreded ? videosFiltreded[0] : null;
        videos = videos?.map((video) => {
          if (video.videoId === firstVideo?.videoId) {
            return { ...video, isScheduled: true, day: day.day };
          }
          return video;
        });
        console.log("firstVideo", firstVideo);
        if (!firstVideo) {
          break;
        }
        totalMinutesDay -= firstVideo.durationMinutes;
        console.log("após subtração totalMinutesDay:", totalMinutesDay);
      }
      console.log("videos após o filtro", videos);
      setListVideos(videos);
    });
  };
  console.log(listVideos);
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
