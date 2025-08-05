import { customAxios } from "@/utils/apis/CustomAxios";

export const refreshAccessToken = async () => {
  return customAxios.post(
    "/auth/refresh/access/token",
    {},
    {
      withCredentials: true,
    }
  );
};
