import { AppDataSource } from "../database/data-source";
import { User } from "../models/userModel";
import * as bcrypt from "bcrypt";
import { HttpError } from "../common/HttpError";

async function getUser(id: string): Promise<User | null> {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  return user;
}

async function getUsers(): Promise<User[]> {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  return users;
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
