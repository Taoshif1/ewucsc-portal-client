import axios from "axios";

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, "");

export const API_BASE_URL = import.meta.env.DEV
  ? configuredApiUrl || "http://localhost:5000/api"
  : "/api";

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
