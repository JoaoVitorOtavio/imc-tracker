import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

export const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(
        {
          body: req.body,
          query: req.query,
          params: req.params,
        },
        { abortEarly: false }
      );
      return next();
    } catch (error: any) {
      return res.status(400).json({
        errors: error.errors,
      });
    }
  };
