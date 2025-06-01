import axios from "axios";
import { getAuthCredentials } from "./cookies";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 180000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const token = getAuthCredentials();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) return Promise.reject(error);
    return Promise.reject(error.response.data);
  }
);

export default http;
