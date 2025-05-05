import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_YOUTUBE_BASE_API_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application",
  },
});
