import { AppDataSource } from "../database/data-source";
import { User } from "../models/userModel";
import * as bcrypt from "bcrypt";
import { HttpError } from "../common/HttpError";
import { Perfil } from "src/common/enums/perfil.enum";

async function getUser(id: string): Promise<User | null> {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  return user;
}

type GetUsersOptions = {
  page?: number;
  limit?: number;
  role?: Perfil;
};

type GetUsersResponse = {
  data: User[];
  total: number;
  currentPage?: number;
  totalPages?: number;
};

async function getUsers({
  page = 1,
  limit = 15,
  role,
}: GetUsersOptions): Promise<GetUsersResponse> {
  const userRepository = AppDataSource.getRepository(User);

  const where: any = {};

  if (role) {
    where.perfil = role;
  }

  const [users, total] = await userRepository.findAndCount({
    where,
    skip: (page - 1) * limit,
    take: limit,
    order: {
      dt_inclusao: "ASC",
    },
  });

  return {
    data: users,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
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
