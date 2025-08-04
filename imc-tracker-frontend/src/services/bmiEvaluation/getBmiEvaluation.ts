import { BmiEvaluation } from "@/common/interfaces/bmi-evaluation/bmi-evaluation.interface";
import axios from "axios";

export const getBmiEvaluation = async (id: string): Promise<BmiEvaluation> => {
  const response = await axios.get<BmiEvaluation>(
    `http://localhost:3001/bmi/evaluations/${id}`
  );

  return response.data;
};
