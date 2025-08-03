import axios from "axios";

interface LoginPayload {
  usuario: string;
  senha: string;
}

export const authService = {
  login(payload: LoginPayload) {
    return axios.post(
      `${process.env.API_URL || "http://localhost:3001"}/auth/login`,
      payload
    );
  },
};
