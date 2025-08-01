import { Request, Response, NextFunction } from "express";
import { HttpError } from "./HttpError";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error(err); // para track tracing
  return res.status(500).json({ error: "Erro interno do servidor" });
}
