import {
  LoginPayload,
  LoginResponse,
} from "@/common/interfaces/auth/login.interface";
import { customAxios } from "@/utils/apis/CustomAxios";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await customAxios.post("/auth/login", payload, {
    withCredentials: true,
  });

  localStorage.setItem("user", JSON.stringify(response.data.user));

  return response.data;
};
