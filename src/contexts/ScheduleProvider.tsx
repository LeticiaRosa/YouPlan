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

type TermsMinutesType = {
  Mon: number;
  Tue: number;
  Wed: number;
  Thu: number;
  Fri: number;
  Sat: number;
  Sun: number;
  qtdeVideos: number;
};

export type ScheduleContextType = {
  termsSearch: TermsSearchType;
  setTerms: (terms: TermsSearchType) => void;
  clearTerms: () => void;
};

export function ScheduleProvider({ children }: ScheduleProviderProps) {
  const [termsSearch, setTermsSearch] = useState<TermsSearchType>(null);

  const setTerms = (terms: TermsSearchType) => {
    console.log("setTerms", terms);
    setTermsSearch(terms);
  };

  const clearTerms = () => {
    setTermsSearch(null);
  };

  return (
    <ScheduleContext.Provider value={{ termsSearch, setTerms, clearTerms }}>
      {children}
    </ScheduleContext.Provider>
  );
}
