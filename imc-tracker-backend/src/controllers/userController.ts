import { Request, Response } from "express";
import userRepository from "../repositories/userRepository";
import { User } from "../models/userModel";
import { HttpError } from "../common/HttpError";

async function getUser(req: Request, res: Response) {
  try {
    const id = req.params.id;

    const user = await userRepository.getUser(id);

    if (!user) {
      throw new HttpError("Usuário não encontrado", 404);
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    const status = error instanceof HttpError ? error.statusCode : 500;
    const message =
      error instanceof Error ? error.message : "Erro interno do servidor";

    return res.status(status).json({ error: message });
  }
}

async function getUsers(_req: Request, res: Response) {
  try {
    const users = await userRepository.getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    const status = error instanceof HttpError ? error.statusCode : 500;
    const message =
      error instanceof Error ? error.message : "Erro interno do servidor";

    return res.status(status).json({ error: message });
  }
}

async function createUser(req: Request, res: Response) {
  try {
    const user = req.body as User;

    const result = await userRepository.createUser(user);

    return res.status(201).json(result);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    const status = error instanceof HttpError ? error.statusCode : 500;
    const message =
      error instanceof Error ? error.message : "Erro interno do servidor";

    return res.status(status).json({ error: message });
  }
}

async function updateUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const body: Partial<User> = req.body;

    await userRepository.updateUser({
      id: userId,
      ...body,
    });

    return res.sendStatus(204);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    const status = error instanceof HttpError ? error.statusCode : 500;
    const message =
      error instanceof Error ? error.message : "Erro interno do servidor";

    return res.status(status).json({ error: message });
  }
}

async function deleteUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;

    await userRepository.deleteUser(userId);

    return res.sendStatus(204);
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    const status = error instanceof HttpError ? error.statusCode : 500;
    const message =
      error instanceof Error ? error.message : "Erro interno do servidor";

    return res.status(status).json({ error: message });
  }
}

export default {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
