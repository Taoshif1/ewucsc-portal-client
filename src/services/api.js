import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// For normal protected backend routes (JWT)
export const api = axios.create({
  baseURL,
});

// For Firebase token based auth routes
export const publicApi = axios.create({
  baseURL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);