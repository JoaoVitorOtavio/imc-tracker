import { NextFunction, Request, Response } from "express";
import { HttpError } from "../common/HttpError";
import BmiEvaluationService from "../services/bmiEvaluationService";
import { BmiEvaluation } from "../models/bmiEvaluationModel";
import { calculateBmi } from "../common/utils/calculateBmi";

async function getBmiEvaluation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const bmiEvaluation = await BmiEvaluationService.getBmiEvaluation(id);

    if (!bmiEvaluation) {
      throw new HttpError("Avaliação IMC nao encontrada", 404);
    }

    return res.status(200).json(bmiEvaluation);
  } catch (error) {
    console.error("Erro ao buscar avaliação IMC:", error);

    next(error);
  }
}

async function getBmiEvaluations(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { page, limit, id_usuario_aluno, id_usuario_avaliacao } = req.query;

    const pageNumber = page ? parseInt(page as string, 10) : undefined;
    const limitNumber = limit ? parseInt(limit as string, 10) : undefined;

    const result = await BmiEvaluationService.getBmiEvaluations({
      page: pageNumber,
      limit: limitNumber,
      id_usuario_aluno: id_usuario_aluno as string,
      id_usuario_avaliacao: id_usuario_avaliacao as string,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao buscar avaliação IMC:", error);

    next(error);
  }
}

async function createBmiEvaluation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bmiEvaluation = req.body as BmiEvaluation;
    const bmi =
      bmiEvaluation.peso / (bmiEvaluation.altura * bmiEvaluation.altura);

    const classification = calculateBmi(bmi);

    const result = await BmiEvaluationService.createBmiEvaluation({
      ...bmiEvaluation,
      imc: Number(bmi.toFixed(2)),
      classificacao: classification,
    });

    return res.status(201).json(result);
  } catch (error) {
    console.error("Erro ao criar avaliação IMC:", error);

    next(error);
  }
}

async function updateBmiEvaluation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const body: Partial<BmiEvaluation> = req.body;

    const bmiEvaluation = await BmiEvaluationService.getBmiEvaluation(id);

    if (!bmiEvaluation) {
      throw new HttpError("Avaliação IMC nao encontrada", 404);
    }

    const peso = body.peso || bmiEvaluation.peso;
    const altura = body.altura || bmiEvaluation.altura;

    const bmi = peso / (altura * altura);

    const classification = calculateBmi(bmi);

    const newBmiEvaluationBody = {
      ...body,
      imc: Number(bmi.toFixed(2)),
      classificacao: classification,
    };

    await BmiEvaluationService.updateBmiEvaluation({
      ...newBmiEvaluationBody,
      id: id,
    });

    return res.sendStatus(204);
  } catch (error) {
    console.error("Erro ao atualizar avaliação IMC:", error);

    next(error);
  }
}

async function deleteBmiEvaluation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;

    await BmiEvaluationService.deleteBmiEvaluation(id);

    return res.sendStatus(204);
  } catch (error) {
    console.error("Erro ao deletar avaliação IMC:", error);

    next(error);
  }
}

export default {
  getBmiEvaluation,
  getBmiEvaluations,
  createBmiEvaluation,
  updateBmiEvaluation,
  deleteBmiEvaluation,
};
