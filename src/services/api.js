import axios from "axios";

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, "");

// Keep the development default local. Production falls back to the original
// API host used by the existing live configuration. The Vercel server project
// currently lacks SUPABASE_URL, so routing production here avoids its 500s
// while that backend's environment is configured.
export const API_BASE_URL = import.meta.env.DEV
  ? configuredApiUrl || "http://localhost:5000/api"
  : configuredApiUrl || "https://api.ewucsc.com/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const publicApi = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
