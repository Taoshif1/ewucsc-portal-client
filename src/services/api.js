import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// automatically attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");

// only attach JWT if Authorization header is not already set
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
