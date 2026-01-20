import { API_URL } from "@env";
import axios, { AxiosError } from "axios";

if (!API_URL) {
  const errorMessage =
    "API_URL is not defined. Please create a .env file in the root directory with API_URL set.";
  throw new Error(errorMessage);
}

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // Avoid hanging requests on bad networks; callers can override per-request if needed.
  timeout: 30_000,
  formSerializer: {
    dots: true,
    indexes: null,
  },
});

apiClient.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  response => {
    if (!response.data) {
      response.data = undefined;
    }

    return response;
  },
  async (error: AxiosError<string>) => {
    return Promise.reject(error);
  },
);

export default apiClient;
