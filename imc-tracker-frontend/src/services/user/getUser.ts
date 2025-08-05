import { User } from "@/common/interfaces/user/user.interface";
import { customAxios } from "@/utils/apis/CustomAxios";

export const getUser = async (id: string): Promise<User> => {
  const response = await customAxios.get(`/users/${id}`, {
    withCredentials: true,
  });

  return response.data;
};
