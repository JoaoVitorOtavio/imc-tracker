import { customAxios } from "@/utils/apis/CustomAxios";

export const deleteUser = async (id: string) => {
  const response = customAxios.delete(`/users/${id}`, {
    withCredentials: true,
  });

  return response;
};
