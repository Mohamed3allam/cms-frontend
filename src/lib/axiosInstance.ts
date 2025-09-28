import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const path = window.location.pathname;
    const firstSegment = path.split("/")[1];

    const locale = firstSegment === "ar" ? firstSegment : "en";

    config.params = {
      ...config.params,
      locale,
    };
  }

  return config;
});

export default api;
