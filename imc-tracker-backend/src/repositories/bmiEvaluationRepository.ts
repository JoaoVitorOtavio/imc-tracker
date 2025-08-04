import {
  GetBmiEvaluationsOption,
  GetBmiEvaluationsResponse,
} from "src/common/interfaces/bmi-evaluation.interface";
import { HttpError } from "../common/HttpError";
import { AppDataSource } from "../database/data-source";
import { BmiEvaluation } from "../models/bmiEvaluationModel";

async function getBmiEvaluation(id: string): Promise<BmiEvaluation | null> {
  const bmiEvaluationRepository = AppDataSource.getRepository(BmiEvaluation);

  const bmiEvaluation = await bmiEvaluationRepository.findOneBy({ id });

  return bmiEvaluation;
}

async function getBmiEvaluations({
  page = 1,
  limit = 15,
  id_usuario_aluno,
  id_usuario_avaliacao,
}: GetBmiEvaluationsOption): Promise<GetBmiEvaluationsResponse> {
  const bmiEvaluationRepository = AppDataSource.getRepository(BmiEvaluation);

  const where: any = {};

  if (id_usuario_aluno) {
    where.id_usuario_aluno = id_usuario_aluno;
  }

  if (id_usuario_avaliacao) {
    where.id_usuario_avaliacao = id_usuario_avaliacao;
  }

  const shouldPaginate = page !== undefined && limit !== undefined;

  const [bmiEvaluations, total] = await bmiEvaluationRepository.findAndCount({
    where,
    skip: shouldPaginate ? (page - 1) * limit : undefined,
    take: shouldPaginate ? limit : undefined,
    order: { dt_inclusao: "ASC" },
    relations: ["usuarioAvaliador", "usuarioAvaliado"],
  });

  return {
    data: bmiEvaluations,
    total,
    currentPage: page ?? 1,
    totalPages: shouldPaginate ? Math.ceil(total / limit!) : 1,
  };
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
