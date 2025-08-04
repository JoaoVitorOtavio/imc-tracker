import { BmiEvaluations } from "@/common/interfaces/bmi-evaluation/bmi-evaluations.interface";
import axios from "axios";

export const getBmiEvaluations = async (
  page: number,
  limit: number,
  id_usuario_aluno?: string,
  id_usuario_avaliacao?: string
): Promise<BmiEvaluations> => {
  const response = await axios.get("http://localhost:3001/bmi/evaluations", {
    params: { page, limit, id_usuario_aluno, id_usuario_avaliacao },
  });

  return response.data;
};
