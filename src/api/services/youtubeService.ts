import { api } from "../clients/youtube";
import { VideoDuration, YouTubeVideo } from "../types/youtube";

/**
 * Busca vídeos no YouTube com base no termo de busca
 */
export async function buscarVideosYouTube(
  maxResults: number,
  termo: string,
  pageToken?: string
): Promise<YouTubeVideo[]> {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  try {
    const response = await api.get("/search", {
      params: {
        key: API_KEY,
        q: termo,
        part: "snippet",
        maxResults: maxResults,
        type: "video",
        videoDuration: "medium",
        pageToken: pageToken,
      },
    });

    const videos: YouTubeVideo[] = response.data.items.map(
      (item: {
        id: { videoId: string };
        snippet: {
          title: string;
          description: string;
          thumbnails: { medium: { url: string } };
        };
      }) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailUrl: item.snippet.thumbnails.medium.url,
      })
    );

    return {
      videos,
      nextPageToken: response.data.nextPageToken,
    };
  } catch (error) {
    console.error("Erro ao buscar vídeos do YouTube:", error);
    return [];
  }
}

/**
 * Obtém a duração de vídeos por seus IDs
 */
export const getVideoDurations = async (
  videoIds: string[]
): Promise<VideoDuration[]> => {
  function parseISODurationToMinutes(isoDuration: string): number {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const match = isoDuration.match(regex);

    if (!match) return 0;

    const hours = parseInt(match[1] || "0");
    const minutes = parseInt(match[2] || "0");
    const seconds = parseInt(match[3] || "0");

    return hours * 60 + minutes + seconds / 60;
  }

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  try {
    const response = await api.get("/videos", {
      params: {
        part: "contentDetails",
        id: videoIds.join(","),
        key: API_KEY,
      },
    });

    const durations = response.data.items.map((duration: any) => {
      const parsedDuration = parseISODurationToMinutes(
        duration.contentDetails.duration
      );
      console.log(parsedDuration);
      return {
        id: duration.id,
        duration: duration.contentDetails.duration,
        durationMinutes: parsedDuration,
      };
    });

    return durations;
  } catch (err) {
    console.error("Erro ao obter duração dos vídeos", err);
    return [];
  }
};
