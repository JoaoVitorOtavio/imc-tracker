import { BmiEvaluation } from "src/models/bmiEvaluationModel";

export interface GetBmiEvaluationsOption {
  page?: number;
  limit?: number;
  id_usuario_aluno?: string;
  id_usuario_avaliacao?: string;
}

export interface GetBmiEvaluationsResponse {
  data: BmiEvaluation[];
  total: number;
  currentPage?: number;
  totalPages?: number;
}
