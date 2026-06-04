import axios, { InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true,
});

// Explicitly type the configuration object using Axios's native types
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.headers) {
    config.headers["ngrok-skip-browser-warning"] = "true";
  }
  return config;
});

export default api;