import { customAxios } from "@/utils/apis/CustomAxios";

export const deleteBmiEvaluation = async (id: string) => {
  const response = await customAxios.delete(`/bmi/evaluations/${id}`, {
    withCredentials: true,
  });

  return response;
};
