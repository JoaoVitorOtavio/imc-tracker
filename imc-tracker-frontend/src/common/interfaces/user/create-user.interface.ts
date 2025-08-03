import { Perfil } from "../../enums/perfil.enum";
import { Situacao } from "../../enums/situacao.enum";

export interface CreateUser {
  nome: string;
  usuario: string;
  senha: string;
  perfil: Perfil;
  situacao: Situacao;
}
