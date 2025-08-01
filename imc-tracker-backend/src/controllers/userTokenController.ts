import { Request, Response } from "express";
import userTokenRepository from "../repositories/userTokenRepository";
import { HttpError } from "../common/HttpError";
import { UserToken } from "../models/userTokenModel";

async function getUserToken(req: Request, res: Response) {
  try {
    const id = req.params.id;

    const userToken = await userTokenRepository.getUserToken(id);

    if (!userToken) {
      throw new HttpError("Token de usuário não encontrado", 404);
    }

    return res.status(200).json(userToken);
  } catch (error) {
    console.error("Erro ao buscar token de usuário:", error);
    const status = error instanceof HttpError ? error.statusCode : 500;
    const message =
      error instanceof Error ? error.message : "Erro interno do servidor";

    return res.status(status).json({ error: message });
  }
}

async function getUsersTokens(_req: Request, res: Response) {
  try {
    const userTokens = await userTokenRepository.getUsersTokens();

    return res.status(200).json(userTokens);
  } catch (error) {
    console.error("Erro ao buscar tokens de usuários:", error);
    const status = error instanceof HttpError ? error.statusCode : 500;
    const message =
      error instanceof Error ? error.message : "Erro interno do servidor";

    return res.status(status).json({ error: message });
  }
}

async function createUserToken(req: Request, res: Response) {
  try {
    const userToken = req.body as UserToken;

    const result = await userTokenRepository.createUserToken(userToken);

    return res.status(201).json(result);
  } catch (error) {
    console.error("Erro ao criar token de usuário:", error);
    let status = error instanceof HttpError ? error.statusCode : 500;
    let message =
      error instanceof Error ? error.message : "Erro interno do servidor";

    if (
      error instanceof Error &&
      error.message.includes("FOREIGN KEY constraint failed")
    ) {
      status = 422;
      message = "Usuário informado não existe.";
    }

    return res.status(status).json({ error: message });
  }
}

async function updateUserToken(req: Request, res: Response) {
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
    let status = error instanceof HttpError ? error.statusCode : 500;
    let message =
      error instanceof Error ? error.message : "Erro interno do servidor";

    if (
      error instanceof Error &&
      error.message.includes("FOREIGN KEY constraint failed")
    ) {
      status = 422;
      message = "Usuário informado não existe.";
    }

    return res.status(status).json({ error: message });
  }
}

async function deleteUserToken(req: Request, res: Response) {
  try {
    const userId = req.params.id;

    await userTokenRepository.deleteUserToken(userId);

    return res.sendStatus(204);
  } catch (error) {
    console.error("Erro ao deletar token de usuário:", error);
    const status = error instanceof HttpError ? error.statusCode : 500;
    const message =
      error instanceof Error ? error.message : "Erro interno do servidor";

    return res.status(status).json({ error: message });
  }
}

export default {
  getUserToken,
  getUsersTokens,
  createUserToken,
  updateUserToken,
  deleteUserToken,
};
