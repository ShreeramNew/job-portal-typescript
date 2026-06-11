import axios, { InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  // ✅ Change this to use a relative path pointing to your Next.js proxy route
  baseURL: "/api/proxy", 
  withCredentials: true,
});

// You can keep the interceptor, but ngrok headers are no longer needed!
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.headers) {
    config.headers["ngrok-skip-browser-warning"] = "true";
  }
  return config;
});

export default api;