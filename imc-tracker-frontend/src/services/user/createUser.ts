import { CreateUser } from "@/common/interfaces/user/create-user.interface";
import { customAxios } from "@/utils/apis/CustomAxios";

export const createUser = async (user: CreateUser) => {
  const response = await customAxios.post("/users", user, {
    withCredentials: true,
  });

  return response;
};
