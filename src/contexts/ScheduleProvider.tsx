import { useState } from "react";
import { ScheduleContext } from "./ScheduleContext";
import { searchVideos } from "../api/services/videoService";
import { getVideoDurations } from "../api/services/youtubeService";
import { format, formatISODuration, parse, parseISO } from "date-fns";

export interface ScheduleProviderProps {
  children: React.ReactNode;
}

export type TermsSearchType =
  | {
      id: number;
      name: string;
    }[]
  | null;

export type MinutesPerDayParams = {
  Mon: number;
  Tue: number;
  Wed: number;
  Thu: number;
  Fri: number;
  Sat: number;
  Sun: number;
  qtdeVideos: number;
} | null;

export type ScheduleContextType = {
  termsSearch: TermsSearchType;
  setTerms: (terms: TermsSearchType) => void;
  clearTerms: () => void;
  setMinutesPerDay: (terms: MinutesPerDayParams) => void;
  executeGenerateSchedule: () => void;
};

export function ScheduleProvider({ children }: ScheduleProviderProps) {
  const [termsSearch, setTermsSearch] = useState<TermsSearchType>(null);
  const [, setMinutesPerDayParams] = useState<MinutesPerDayParams>(null);

  const setTerms = (terms: TermsSearchType) => {
    setTermsSearch(terms);
  };

  const clearTerms = () => {
    setTermsSearch(null);
  };

  const setMinutesPerDay = (params: MinutesPerDayParams) => {
    setMinutesPerDayParams(params);
  };
  const parseISODurationToMinutes = (duration: string): number => {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = duration.match(regex);

    const hours = parseInt(matches?.[1] || "0", 10);
    const minutes = parseInt(matches?.[2] || "0", 10);
    const seconds = parseInt(matches?.[3] || "0", 10);

    return Math.floor(hours * 60 + minutes + seconds / 60);
  };

  const executeGenerateSchedule = async () => {
    // const videos = await searchVideos(termsSearch);
    // const listIds = videos?.map((video) => video.videoId);
    // const durations = await getVideoDurations(listIds as string[]);
    // console.log("durations", durations);
    console.log("PT22S =>", parseISODurationToMinutes("PT12S"));
    // const filtered = durations.filter((d) => d.duration !== "PT0S");
    // const formattedDurations = filtered.map((duration) => {
    //   const parsedDuration = parseISODurationToMinutes(duration.duration);
    //   console.log("parsedDuration", parsedDuration);
    //   return parsedDuration;
    // });

    // console.log("durations", formattedDurations);
    // return durations;
  };

  return (
    <ScheduleContext.Provider
      value={{
        termsSearch,
        setTerms,
        clearTerms,
        setMinutesPerDay,
        executeGenerateSchedule,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}
