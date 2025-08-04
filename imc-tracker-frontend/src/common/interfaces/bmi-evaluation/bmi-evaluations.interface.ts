import { User } from "../user/user.interface";

interface BmiEvaluation {
  id: string;
  altura: number;
  peso: number;
  imc: number;
  classificacao: string;
  id_usuario_avaliacao: string;
  id_usuario_aluno: string;
  dt_inclusao: Date;
  usuarioAvaliado: User;
  usuarioAvaliador: User;
}

export interface BmiEvaluations {
  data: BmiEvaluation[];
  total: number;
  currentPage?: number;
  totalPages?: number;
}
