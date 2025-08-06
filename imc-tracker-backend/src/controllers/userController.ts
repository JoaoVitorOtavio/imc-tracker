import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";
import { User } from "../models/userModel";
import { HttpError } from "../common/HttpError";
import { Perfil } from "src/common/enums/perfil.enum";
import { Situacao } from "src/common/enums/situacao.enum";

async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;

    const user = await userService.getUser(id);

    if (!user) {
      throw new HttpError("Usuário não encontrado", 404);
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);

    next(error);
  }
}

async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit, role, nameOrUsername, situation } = req.query;

    const pageNumber = page ? parseInt(page as string, 10) : undefined;
    const limitNumber = limit ? parseInt(limit as string, 10) : undefined;

    const result = await userService.getUsers({
      page: pageNumber,
      limit: limitNumber,
      role: role as Perfil,
      nameOrUsername: nameOrUsername as string,
      situation: situation as Situacao,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);

    next(error);
  }
}

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.body as User;

    const result = await userService.createUser(user);

    return res.status(201).json(result);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);

    next(error);
  }
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.params.id;
    const body: Partial<User> = req.body;

    await userService.updateUser({
      id: userId,
      ...body,
    });

    return res.sendStatus(204);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);

    next(error);
  }
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.params.id;

    await userService.deleteUser(userId);

    return res.sendStatus(204);
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);

    next(error);
  }
}

export default {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
