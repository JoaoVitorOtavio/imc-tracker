import { Perfil } from "@/common/enums/perfil.enum";
import { Situacao } from "@/common/enums/situacao.enum";

export interface User {
  id: string;
  nome: string;
  usuario: string;
  senha: string;
  perfil: Perfil;
  situacao: Situacao;
  dt_inclusao: Date;
}
