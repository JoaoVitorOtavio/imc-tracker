import { EditBmiEvaluation } from "@/common/interfaces/bmi-evaluation/edit-bmi-evaluation.interface";
import { customAxios } from "@/utils/apis/CustomAxios";

export const editBmiEvaluation = async (
  id: string,
  bmiEvaluation: EditBmiEvaluation
) => {
  const response = await customAxios.put(
    `/bmi/evaluations/${id}`,
    bmiEvaluation,
    {
      withCredentials: true,
    }
  );

  return response;
};
