import { Perfil } from "@/common/enums/perfil.enum";
import { Situacao } from "@/common/enums/situacao.enum";

interface UserToken {
  altura: number;
  classificacao: string;
  dt_inclusao: Date;
  id: string;
  id_usuario_aluno: string;
  id_usuario_avaliacao: string;
  imc: number;
  peso: number;
}

export interface User {
  id: string;
  nome: string;
  usuario: string;
  senha: string;
  perfil: Perfil;
  situacao: Situacao;
  dt_inclusao: Date;
  avaliacoesFeitas?: UserToken[];
  avaliacoesRecebidas?: UserToken[];
}
