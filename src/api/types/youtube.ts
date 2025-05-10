export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
}

export interface YouTubeResponse {
  videos: YouTubeVideo[];
  nextPageToken: string | null;
}

export interface VideoDuration {
  id: string;
  duration: string;
  durationMinutes: number;
}
