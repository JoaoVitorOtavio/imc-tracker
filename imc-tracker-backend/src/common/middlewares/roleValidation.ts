import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../utils/jwt"; // ajuste o caminho conforme necessário

export function roleValidation(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Token de acesso não encontrado." });
    }

    try {
      const decodedToken = decodeToken(accessToken) as {
        id: string;
        perfil: string;
      };

      if (!allowedRoles.includes(decodedToken.perfil)) {
        return res
          .status(401)
          .json({ message: "Acesso negado. Permissão insuficiente." });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Token inválido." });
    }
  };
}
