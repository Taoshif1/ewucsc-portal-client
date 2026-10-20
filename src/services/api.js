import axios from "axios";

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, "");
const productionApiFallback = "https://api.ewucsc.com/api";
const isLoopbackUrl = (value = "") =>
  /^https?:\/\/(?:localhost|127(?:\.\d{1,3}){3}|0\.0\.0\.0|\[::1\])(?::\d+)?(?:\/|$)/i.test(
    value,
  );

// Never ship a local development API address into a production browser bundle.
// Vite variables are embedded at build time, so removing a bad variable later
// requires a fresh production build to change the already-deployed JavaScript.
const productionApiUrl =
  configuredApiUrl && !isLoopbackUrl(configuredApiUrl)
    ? configuredApiUrl
    : productionApiFallback;

export const API_BASE_URL = import.meta.env.DEV
  ? configuredApiUrl || "http://localhost:5000/api"
  : productionApiUrl;

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
