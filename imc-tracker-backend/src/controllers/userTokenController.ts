import { NextFunction, Request, Response } from "express";
import userTokenRepository from "../repositories/userTokenRepository";
import { HttpError } from "../common/HttpError";
import { UserToken } from "../models/userTokenModel";

async function getUserToken(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;

    const userToken = await userTokenRepository.getUserToken(id);

    if (!userToken) {
      throw new HttpError("Token de usuário não encontrado", 404);
    }

    return res.status(200).json(userToken);
  } catch (error) {
    console.error("Erro ao buscar token de usuário:", error);

    next(error);
  }
}

async function getUsersTokens(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userTokens = await userTokenRepository.getUsersTokens();

    return res.status(200).json(userTokens);
  } catch (error) {
    console.error("Erro ao buscar tokens de usuários:", error);

    next(error);
  }
}

async function createUserToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userToken = req.body as UserToken;

    const result = await userTokenRepository.createUserToken(userToken);

    return res.status(201).json(result);
  } catch (error) {
    console.error("Erro ao criar token de usuário:", error);

    next(error);
  }
}

async function updateUserToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.id;
    const body: Partial<UserToken> = req.body;

    await userTokenRepository.updateUserToken({
      id: userId,
      ...body,
    });

    return res.sendStatus(204);
  } catch (error) {
    console.error("Erro ao atualizar token de usuário:", error);

    next(error);
  }
}

async function deleteUserToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.id;

    await userTokenRepository.deleteUserToken(userId);

    return res.sendStatus(204);
  } catch (error) {
    console.error("Erro ao deletar token de usuário:", error);

    next(error);
  }
}

export default {
  getUserToken,
  getUsersTokens,
  createUserToken,
  updateUserToken,
  deleteUserToken,
};
