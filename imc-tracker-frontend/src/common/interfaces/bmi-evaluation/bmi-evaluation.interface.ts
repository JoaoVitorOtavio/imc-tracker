export interface BmiEvaluation {
  id: string;
  altura: number;
  peso: number;
  imc: number;
  classificacao: string;
  id_usuario_avaliacao: string;
  id_usuario_aluno: string;
  dt_inclusao: Date;
}
