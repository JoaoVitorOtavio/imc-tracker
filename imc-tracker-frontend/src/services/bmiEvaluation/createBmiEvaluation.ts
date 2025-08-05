import { CreateBmiEvaluation } from "@/common/interfaces/bmi-evaluation/create-bmi-evaluation.interface";
import { customAxios } from "@/utils/apis/CustomAxios";

export const createBmiEvaluation = async (
  bmiEvaluation: CreateBmiEvaluation
) => {
  const response = await customAxios.post("/bmi/evaluations", bmiEvaluation, {
    withCredentials: true,
  });

  return response;
};
