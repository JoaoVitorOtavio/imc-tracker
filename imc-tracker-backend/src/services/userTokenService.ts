import { HttpError } from "../common/HttpError";
import { AppDataSource } from "../database/data-source";
import { UserToken } from "../models/userTokenModel";

async function getUserToken(id: string): Promise<UserToken | null> {
  const userTokenRepository = AppDataSource.getRepository(UserToken);

  const userToken = await userTokenRepository.findOneBy({ id });

  return userToken;
}

async function getUserTokenByUserId(userId: string): Promise<UserToken | null> {
  const userTokenRepository = AppDataSource.getRepository(UserToken);

  const userToken = await userTokenRepository.findOneBy({ id_usuario: userId });

  return userToken;
}

async function getUsersTokens(): Promise<UserToken[]> {
  const userTokenRepository = AppDataSource.getRepository(UserToken);

  const userTokens = await userTokenRepository.find();

  return userTokens;
}

async function createUserToken(userToken: UserToken) {
  const userTokenRepository = AppDataSource.getRepository(UserToken);

  const createdUserToken = await userTokenRepository.save(userToken);

  return createdUserToken;
}

async function updateUserToken(userToken: Partial<UserToken>) {
  const userTokenRepository = AppDataSource.getRepository(UserToken);

  const result = await userTokenRepository.update(
    { id: userToken.id },
    userToken
  );

  if (result.affected === 0) {
    throw new HttpError("Usuário não encontrado", 404);
  }
}

async function deleteUserToken(id: string) {
  const userTokenRepository = AppDataSource.getRepository(UserToken);

  const result = await userTokenRepository.delete(id);

  if (result.affected === 0) {
    throw new HttpError("Usuário não encontrado", 404);
  }
}

export default {
  getUserToken,
  getUsersTokens,
  createUserToken,
  updateUserToken,
  deleteUserToken,
  getUserTokenByUserId,
};
