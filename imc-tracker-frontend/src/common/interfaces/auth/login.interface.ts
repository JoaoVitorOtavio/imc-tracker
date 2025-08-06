export interface LoginPayload {
  usuario: string;
  senha: string;
}

export interface UserOnLogin {
  id: string;
  nome: string;
  usuario: string;
  perfil: string;
}

export interface LoginResponse {
  accessToken: string;
  user: UserOnLogin;
}
