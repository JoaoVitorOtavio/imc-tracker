import { Perfil } from "@/common/enums/perfil.enum";
import { Users } from "@/common/interfaces/user/users.interface";
import axios from "axios";

export const getUsers = async (
  page?: number,
  limit?: number,
  role?: Perfil
): Promise<Users> => {
  const response = await axios.get(`http://localhost:3001/users`, {
    params: { role, page, limit },
  });

  return response.data;
};
