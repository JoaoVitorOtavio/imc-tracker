import axios from "axios";

export const deleteBmiEvaluation = async (id: string) => {
  return axios.delete(`http://localhost:3001/bmi/evaluations/${id}`);
};
