import { TermsSearchType } from "../../contexts/ScheduleProvider";
import { buscarVideosYouTube } from "./youtubeService";

export const searchVideos = (termsSearch: TermsSearchType) => {
  if (termsSearch) {
    const searchParams = termsSearch.map((term) => term.name).join(",");
    try {
      const response = buscarVideosYouTube(searchParams);
      console.log("response", response);
      return response;
    } catch (error) {
      console.error("Erro ao buscar vídeos:", error);
    }
  }
};
