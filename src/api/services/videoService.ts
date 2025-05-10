import { TermsSearchType } from "../../contexts/ScheduleProvider";
import { YouTubeResponse } from "../types/youtube";
import { buscarVideosYouTube } from "./youtubeService";

export const searchVideos = async (
  maxResults: number,
  termsSearch: TermsSearchType,
  pageToken?: string
): Promise<YouTubeResponse | { videos: []; nextPageToken: null }> => {
  try {
    if (!termsSearch || termsSearch.length === 0) {
      return { videos: [], nextPageToken: null };
    }

    // Combine todos os termos com "OR" para pesquisa
    const searchTerm = termsSearch.map((term) => term.name).join(" OR ");

    // Use a função buscarVideosYouTube modificada
    const result = await buscarVideosYouTube(maxResults, searchTerm, pageToken);
    return result as YouTubeResponse;
  } catch (error) {
    console.error("Erro ao buscar vídeos:", error);
    return { videos: [], nextPageToken: null };
  }
};
