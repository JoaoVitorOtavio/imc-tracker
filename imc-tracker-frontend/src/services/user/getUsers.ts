import { Perfil } from "@/common/enums/perfil.enum";
import { Users } from "@/common/interfaces/user/users.interface";
import { customAxios } from "@/utils/apis/CustomAxios";

export const getUsers = async (
  page?: number,
  limit?: number,
  role?: Perfil,
  nameOrUsername?: string
): Promise<Users> => {
  const response = await customAxios.get(`/users`, {
    params: { role, page, limit, nameOrUsername },
    withCredentials: true,
  });

  return response.data;
};
