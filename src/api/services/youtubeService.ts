import { api } from "../clients/youtube";
import { VideoDuration, YouTubeResponse, YouTubeVideo } from "../types/youtube";

export async function buscarVideosYouTube(
  maxResults: number,
  termo: string,
  pageToken?: string
): Promise<YouTubeResponse | []> {
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
    return { videos: [], nextPageToken: null };
  }
}

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

  // Função helper para delay
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const BATCH_SIZE = 50; // YouTube permite até 50 IDs por request
  const allDurations: VideoDuration[] = [];

  try {
    console.log(
      `Processando ${videoIds.length} vídeos em lotes de ${BATCH_SIZE}`
    );

    // Dividir videoIds em lotes
    for (let i = 0; i < videoIds.length; i += BATCH_SIZE) {
      const batch = videoIds.slice(i, i + BATCH_SIZE);
      const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
      const totalBatches = Math.ceil(videoIds.length / BATCH_SIZE);

      console.log(
        `Processando lote ${batchNumber}/${totalBatches} (${batch.length} vídeos)`
      );

      const response = await api.get("/videos", {
        params: {
          part: "contentDetails",
          id: batch.join(","),
          key: API_KEY,
        },
      });

      const durations = response.data.items.map(
        (duration: {
          id: string;
          contentDetails: {
            duration: string;
          };
        }) => {
          const parsedDuration = parseISODurationToMinutes(
            duration.contentDetails.duration
          );
          return {
            id: duration.id,
            duration: duration.contentDetails.duration,
            durationMinutes: parsedDuration,
          };
        }
      );

      allDurations.push(...durations);

      // Adicionar delay entre requests (exceto no último lote)
      if (i + BATCH_SIZE < videoIds.length) {
        await delay(100); // 100ms de delay
      }
    }
    console.log(
      `Processamento concluído: ${allDurations.length} durações obtidas`
    );
    return allDurations;
  } catch (err) {
    console.error("Erro ao obter duração dos vídeos", err);
    return [];
  }
};
