import { BASE_URL } from "@/common/constants";
import { refreshAccessToken } from "@/services/auth/refreshAccessToken";
import axios from "axios";

export const customAxios = axios.create({
  baseURL: BASE_URL,
});

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken();
        return customAxios(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);
