import { customAxios } from "@/utils/apis/CustomAxios";

interface LoginPayload {
  usuario: string;
  senha: string;
}

export const login = async (payload: LoginPayload) => {
  return customAxios.post("/auth/login", payload, {
    withCredentials: true,
  });
};
