import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants";
import { HttpError } from "../HttpError";

interface IGetUserAuthInfoRequest extends Request {
  user?: string | jwt.JwtPayload | undefined;
}
export const JwtAuthMiddleWare = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const accessToken: string = req.cookies.accessToken;

  try {
    if (!accessToken) {
      throw new HttpError("Usuário não autenticado, token ausente", 403);
    }

    jwt.verify(accessToken, JWT_SECRET!, (err, user) => {
      if (err) {
        throw new HttpError("Verificação de token falhou", 403);
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
