import { CreateBmiEvaluation } from "@/common/interfaces/bmi-evaluation/create-bmi-evaluation.interface";
import axios from "axios";

export const createBmiEvaluation = async (
  bmiEvaluation: CreateBmiEvaluation
) => {
  // TODO: retirar essa string localhost:3001 e deixar .env
  // Ou parar de usar o axios e usar um middlware como API para ja fazer
  // o tratamento dentro dela centralizando certinho tudo
  // como a url e tb o body que vai ser passado e o jwt
  return axios.post("http://localhost:3001/bmi/evaluations", bmiEvaluation);
};
