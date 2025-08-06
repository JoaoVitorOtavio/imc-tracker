import { Perfil } from "@/common/enums/perfil.enum";
import { Situacao } from "@/common/enums/situacao.enum";
import { Users } from "@/common/interfaces/user/users.interface";
import { customAxios } from "@/utils/apis/CustomAxios";

export const getUsers = async (
  page?: number,
  limit?: number,
  role?: Perfil,
  nameOrUsername?: string,
  situation?: Situacao
): Promise<Users> => {
  const response = await customAxios.get(`/users`, {
    params: { role, page, limit, nameOrUsername, situation },
    withCredentials: true,
  });

  return response.data;
};
