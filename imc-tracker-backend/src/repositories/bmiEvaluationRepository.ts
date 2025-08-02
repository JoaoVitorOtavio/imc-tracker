import { HttpError } from "../common/HttpError";
import { AppDataSource } from "../database/data-source";
import { BmiEvaluation } from "../models/bmiEvaluationModel";

async function getBmiEvaluation(id: string): Promise<BmiEvaluation | null> {
  const bmiEvaluationRepository = AppDataSource.getRepository(BmiEvaluation);

  const bmiEvaluation = await bmiEvaluationRepository.findOneBy({ id });

  return bmiEvaluation;
}

async function getBmiEvaluations(): Promise<BmiEvaluation[]> {
  const bmiEvaluationRepository = AppDataSource.getRepository(BmiEvaluation);

  const bmiEvaluations = await bmiEvaluationRepository.find();

  return bmiEvaluations;
}

async function createBmiEvaluation(
  bmiEvaluation: BmiEvaluation
): Promise<BmiEvaluation> {
  const bmiEvaluationRepository = AppDataSource.getRepository(BmiEvaluation);

  const createdBmiEvaluation = await bmiEvaluationRepository.save(
    bmiEvaluation
  );

  return createdBmiEvaluation;
}

async function updateBmiEvaluation(bmiEvaluation: Partial<BmiEvaluation>) {
  const bmiEvaluationRepository = AppDataSource.getRepository(BmiEvaluation);

  const result = await bmiEvaluationRepository.update(
    { id: bmiEvaluation.id },
    bmiEvaluation
  );

  if (result.affected === 0) {
    throw new HttpError("Usuário não encontrado", 404);
  }
}

async function deleteBmiEvaluation(id: string) {
  const bmiEvaluationRepository = AppDataSource.getRepository(BmiEvaluation);

  const result = await bmiEvaluationRepository.delete(id);

  if (result.affected === 0) {
    throw new HttpError("Usuário não encontrado", 404);
  }
}

export default {
  getBmiEvaluation,
  getBmiEvaluations,
  createBmiEvaluation,
  updateBmiEvaluation,
  deleteBmiEvaluation,
};
