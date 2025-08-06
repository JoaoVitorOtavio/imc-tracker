import { User } from "src/models/userModel";
import { Perfil } from "../enums/perfil.enum";
import { Situacao } from "../enums/situacao.enum";

export interface GetUsersOptions {
  page?: number;
  limit?: number;
  role?: Perfil;
  nameOrUsername?: string;
  situation?: Situacao;
}

export interface GetUsersResponse {
  data: User[];
  total: number;
  currentPage?: number;
  totalPages?: number;
}
