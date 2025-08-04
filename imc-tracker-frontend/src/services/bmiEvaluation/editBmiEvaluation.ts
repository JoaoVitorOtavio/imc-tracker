import { EditBmiEvaluation } from "@/common/interfaces/bmi-evaluation/edit-bmi-evaluation.interface";
import axios from "axios";

export const editBmiEvaluation = async (
  id: string,
  bmiEvaluation: EditBmiEvaluation
) => {
  return axios.put(
    `http://localhost:3001/bmi/evaluations/${id}`,
    bmiEvaluation
  );
};
