import { AppDataSource } from "../database/data-source";
import { User } from "../models/userModel";
import * as bcrypt from "bcrypt";
import { HttpError } from "../common/HttpError";
import { Perfil } from "src/common/enums/perfil.enum";
import {
  GetUsersOptions,
  GetUsersResponse,
} from "src/common/interfaces/user.interfaces";
import { Like } from "typeorm";

async function getUser(id: string): Promise<User | null> {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  return user;
}

async function getUsers({
  page,
  limit,
  role,
  nameOrUsername,
  situation,
}: GetUsersOptions): Promise<GetUsersResponse> {
  const userRepository = AppDataSource.getRepository(User);

  const where: any[] = [];

  if (nameOrUsername) {
    where.push({ nome: Like(`%${nameOrUsername}%`) });
    where.push({ usuario: Like(`%${nameOrUsername}%`) });
  }

  if (situation) {
    where.push({ situacao: situation });
  }

  if (role) {
    if (where.length > 0) {
      for (let i = 0; i < where.length; i++) {
        where[i] = { ...where[i], perfil: role };
      }
    } else {
      where.push({ perfil: role });
    }
  }

  const shouldPaginate = page !== undefined && limit !== undefined;

  const [users, total] = await userRepository.findAndCount({
    where: where.length > 0 ? where : {},
    skip: shouldPaginate ? (page - 1) * limit : undefined,
    take: shouldPaginate ? limit : undefined,
    order: {
      nome: "ASC",
    },
  });

  return {
    data: users,
    total,
    currentPage: page ?? 1,
    totalPages: shouldPaginate ? Math.ceil(total / limit!) : 1,
  };
}

async function createUser(user: User) {
  const userRepository = AppDataSource.getRepository(User);

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(user.senha, salt);

  const createdUser = await userRepository.save({
    ...user,
    senha: hashedPassword,
  });

  delete (createdUser as any).senha;

  return createdUser;
}

async function updateUser(user: Partial<User>) {
  const userRepository = AppDataSource.getRepository(User);

  if (user.senha) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(user.senha, salt);

    user.senha = hashedPassword;
  }

  const result = await userRepository.update({ id: user.id }, user);

  if (result.affected === 0) {
    throw new HttpError("Usuário não encontrado", 404);
  }
}

async function deleteUser(id: string) {
  const userRepository = AppDataSource.getRepository(User);
  const result = await userRepository.delete(id);

  if (result.affected === 0) {
    throw new HttpError("Usuário não encontrado", 404);
  }
}

export default {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
