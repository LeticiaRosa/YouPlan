import { api } from "../clients/youtube";
import { VideoDuration, YouTubeVideo } from "../types/youtube";

/**
 * Busca vídeos no YouTube com base no termo de busca
 */
export async function buscarVideosYouTube(
  termo: string
): Promise<YouTubeVideo[]> {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  try {
    const response = await api.get("/search", {
      params: {
        key: API_KEY,
        q: termo,
        part: "snippet",
        maxResults: 10,
        type: "video",
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
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailUrl: item.snippet.thumbnails.medium.url,
      })
    );

    return videos;
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
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  try {
    const response = await api.get("/videos", {
      params: {
        part: "contentDetails",
        id: videoIds.join(","),
        key: API_KEY,
      },
    });

    const durations = response.data.items.map((item: any) => ({
      id: item.id,
      duration: item.contentDetails.duration,
    }));

    return durations;
  } catch (err) {
    console.error("Erro ao obter duração dos vídeos", err);
    return [];
  }
};
