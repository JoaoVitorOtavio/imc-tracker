export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    nome: string;
    usuario: string;
    perfil: string;
  };
}
