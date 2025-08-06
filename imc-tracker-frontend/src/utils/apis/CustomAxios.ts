import { BASE_URL } from "@/common/constants";
import { toaster } from "@/components/ui/toaster";
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

        localStorage.removeItem("user");

        window.location.href = "/";

        toaster.error({
          title: `Login expirado, por favor faça login novamente!`,
          type: "error",
          duration: 3000,
          closable: true,
        });
      }
    }
    return Promise.reject(error);
  }
);
