import { Request, Response, NextFunction } from "express";
import { QueryFailedError } from "typeorm";
import { HttpError } from "./HttpError";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isSqliteConstraintError =
    err instanceof QueryFailedError &&
    err.driverError?.code === "SQLITE_CONSTRAINT" &&
    typeof err.message === "string";

  if (isSqliteConstraintError) {
    const message = err.message.toLowerCase();

    // fallback para violacao de chave estrangeira (FK)
    if (message.includes("foreign key constraint failed")) {
      // Se foi ao deletar um recurso referenciado
      if (req.method === "DELETE") {
        return res.status(409).json({
          error:
            "Não é possível remover este recurso pois ele está vinculado a outros dados.",
        });
      }

      // Se foi ao inserir/atualizar com FK inválida
      return res.status(422).json({
        error: "FK informada não existe.",
      });
    }

    //Erros nao mapeados de constraint
    return res.status(400).json({
      error: "Violação de integridade no banco de dados.",
    });
  }

  // Tratamento para HttpErrors personalizados
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Fallback para erros inesperados
  console.error(err);
  return res.status(500).json({ error: "Erro interno do servidor" });
}
