import { customAxios } from "@/utils/apis/CustomAxios";

export const logout = async () => {
  return await customAxios.post("/auth/logout", {}, { withCredentials: true });
};
