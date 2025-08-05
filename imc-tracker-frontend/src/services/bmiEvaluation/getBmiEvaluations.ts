import { BmiEvaluations } from "@/common/interfaces/bmi-evaluation/bmi-evaluations.interface";
import { customAxios } from "@/utils/apis/CustomAxios";

export const getBmiEvaluations = async (
  page: number,
  limit: number,
  id_usuario_aluno?: string,
  id_usuario_avaliacao?: string
): Promise<BmiEvaluations> => {
  const response = await customAxios.get("/bmi/evaluations", {
    params: { page, limit, id_usuario_aluno, id_usuario_avaliacao },
    withCredentials: true,
  });

  return response.data;
};
