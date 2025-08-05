import { BmiEvaluation } from "@/common/interfaces/bmi-evaluation/bmi-evaluation.interface";
import { customAxios } from "@/utils/apis/CustomAxios";

export const getBmiEvaluation = async (id: string): Promise<BmiEvaluation> => {
  const response = await customAxios.get(`/bmi/evaluations/${id}`, {
    withCredentials: true,
  });

  return response.data;
};
