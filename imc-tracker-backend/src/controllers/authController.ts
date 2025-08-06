import { Request, Response, NextFunction } from "express";
import authService from "../services/authService";
import { ACCESS_TOKEN } from "../common/constants";

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { usuario, senha } = req.body;

    const result = await authService.login(usuario, senha);

    res.cookie(ACCESS_TOKEN, result.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    const { refreshToken, ...resultWithoutRefreshToken } = result;

    return res.status(200).json(resultWithoutRefreshToken);
  } catch (error) {
    console.error("Erro ao fazer login:", error);

    next(error);
  }
}

async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const accessToken: string = req.cookies.accessToken;

    await authService.logout(accessToken);

    res.clearCookie(ACCESS_TOKEN, {
      path: "/",
      sameSite: "lax",
      secure: false,
    });

    return res.sendStatus(204);
  } catch (error) {
    console.error("Erro ao fazer logout:", error);

    next(error);
  }
}

async function refreshAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accessToken: string = req.cookies.accessToken;

    const result = await authService.refreshAccessToken(accessToken);

    res.cookie(ACCESS_TOKEN, result.accessToken, {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao atualizar token de acesso:", error);

    next(error);
  }
}

export default { login, refreshAccessToken, logout };
