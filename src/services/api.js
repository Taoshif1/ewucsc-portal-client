import axios from "axios";

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, "");

// Keep the development default local. In production, use the verified Vercel
// server alias unless an explicit VITE_API_URL is configured for this deployment.
// The old api.ewucsc.com hostname is not attached to the connected Vercel server
// project, which can route new API endpoints to a stale/404 backend.
export const API_BASE_URL = import.meta.env.DEV
  ? configuredApiUrl || "http://localhost:5000/api"
  : configuredApiUrl || "https://ewucsc-portal-server.vercel.app/api";

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
