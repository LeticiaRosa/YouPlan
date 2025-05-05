import { useState } from "react";
import { ScheduleContext } from "./ScheduleContext";

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
};

export function ScheduleProvider({ children }: ScheduleProviderProps) {
  const [termsSearch, setTermsSearch] = useState<TermsSearchType>(null);
  const [, setMinutesPerDayParams] = useState<MinutesPerDayParams>(null);

  const setTerms = (terms: TermsSearchType) => {
    console.log("setTerms", terms);
    setTermsSearch(terms);
  };

  const clearTerms = () => {
    setTermsSearch(null);
  };

  const setMinutesPerDay = (params: MinutesPerDayParams) => {
    console.log("setMinutesPerDay", params);
    setMinutesPerDayParams(params);
  };

  return (
    <ScheduleContext.Provider
      value={{ termsSearch, setTerms, clearTerms, setMinutesPerDay }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}
