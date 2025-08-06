import bcrypt from "bcrypt";
import { decodeToken, generateToken, isTokenValid } from "../common/utils/jwt";
import { AppDataSource } from "../database/data-source";
import { User } from "../models/userModel";
import { HttpError } from "../common/HttpError";
import userTokenRepository from "./userTokenRepository";
import { UserToken } from "../models/userTokenModel";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from "../common/constants";
import { SignOptions } from "jsonwebtoken";
import { Situacao } from "../common/enums/situacao.enum";
import { LoginResponse } from "../common/interfaces/auth.interface";

async function login(
  userName: string,
  password: string
): Promise<LoginResponse> {
  const userRepository = AppDataSource.getRepository(User);

  const userOnDb = await userRepository.findOneBy({ usuario: userName });

  if (!userOnDb) {
    throw new HttpError("Usuário não encontrado", 404);
  }

  if (userOnDb.situacao === Situacao.INATIVO) {
    throw new HttpError("Usuário inativo", 401);
  }

  const senhaCorreta = await bcrypt.compare(password, userOnDb.senha);

  if (!senhaCorreta) {
    throw new HttpError("Senha incorreta", 401);
  }

  const accessToken = generateToken(
    { id: userOnDb.id, perfil: userOnDb.perfil },
    ACCESS_TOKEN_EXPIRES_IN as SignOptions["expiresIn"]
  );

  const refreshToken = generateToken(
    { id: userOnDb.id, perfil: userOnDb.perfil },
    REFRESH_TOKEN_EXPIRES_IN as SignOptions["expiresIn"]
  );

  const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

  const userTokenBody = {
    id_usuario: userOnDb.id,
    refresh_token: refreshToken,
    expiracao_token: new Date(Date.now() + ONE_DAY_IN_MS),
  };

  await userTokenRepository.createUserToken(userTokenBody as UserToken);

  return {
    accessToken,
    refreshToken,
    user: {
      id: userOnDb.id,
      nome: userOnDb.nome,
      usuario: userOnDb.usuario,
      perfil: userOnDb.perfil,
    },
  };
}

async function refreshAccessToken(
  accessToken: string
): Promise<{ accessToken: string }> {
  if (!accessToken) {
    throw new HttpError("Token não encontrado", 401);
  }

  const decodedToken = decodeToken(accessToken) as {
    id: string;
    perfil: string;
  };

  if (!decodedToken) {
    throw new HttpError("Token inválido", 401);
  }

  const userId = decodedToken.id;
  const userRole = decodedToken.perfil;

  const userToken = await userTokenRepository.getUserTokenByUserId(userId);

  if (!userToken) {
    throw new HttpError("Refresh Token não encontrado", 401);
  }

  const validToken = isTokenValid(userToken?.refresh_token!);

  if (!validToken) {
    await userTokenRepository.deleteUserToken(userToken.id);
    throw new HttpError("Refresh Token inválido", 401);
  }

  const accessTokenRefreshed = generateToken(
    { id: userId, perfil: userRole },
    ACCESS_TOKEN_EXPIRES_IN as SignOptions["expiresIn"]
  );

  return { accessToken: accessTokenRefreshed };
}

export default { login, refreshAccessToken };
