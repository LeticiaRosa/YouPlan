import { TermsSearchType } from "../../contexts/ScheduleProvider";
import { buscarVideosYouTube } from "./youtubeService";

export const searchVideos = async (
  maxResults: number,
  termsSearch: TermsSearchType,
  pageToken?: string
) => {
  try {
    if (!termsSearch || termsSearch.length === 0) {
      return { videos: [], nextPageToken: undefined };
    }

    // Combine todos os termos com "OR" para pesquisa
    const searchTerm = termsSearch.map((term) => term.name).join(" OR ");

    // Use a função buscarVideosYouTube modificada
    const result = await buscarVideosYouTube(maxResults, searchTerm, pageToken);
    return result;
  } catch (error) {
    console.error("Erro ao buscar vídeos:", error);
    return { videos: [], nextPageToken: undefined };
  }
};
