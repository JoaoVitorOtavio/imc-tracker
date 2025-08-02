import { NextFunction, Request, Response } from "express";
import { HttpError } from "../common/HttpError";
import BmiEvaluationRepository from "../repositories/bmiEvaluationRepository";
import { BmiEvaluation } from "../models/bmiEvaluationModel";
import { calculateBmi } from "../common/utils/calculateBmi";

async function getBmiEvaluation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const bmiEvaluation = await BmiEvaluationRepository.getBmiEvaluation(id);

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
    const bmiEvaluations = await BmiEvaluationRepository.getBmiEvaluations();

    return res.status(200).json(bmiEvaluations);
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

    const result = await BmiEvaluationRepository.createBmiEvaluation({
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

    const bmiEvaluation = await BmiEvaluationRepository.getBmiEvaluation(id);

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

    await BmiEvaluationRepository.updateBmiEvaluation({
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

    await BmiEvaluationRepository.deleteBmiEvaluation(id);

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
