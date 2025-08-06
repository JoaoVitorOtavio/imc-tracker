import express from "express";
import { validate } from "../common/middlewares/validate";
import bmiEvaluationController from "../controllers/bmiEvaluationController";
import {
  createBmiEvaluationSchema,
  deleteBmiEvaluationSchema,
  getBmiEvaluationSchema,
  updateBmiEvaluationSchema,
} from "../common/validations/bmiEvaluationSchemas";
import { JwtAuthMiddleWare } from "../common/middlewares/jwtMiddleware";
import { roleValidation } from "../common/middlewares/roleValidation";

const router = express.Router();

router.get(
  "/",
  JwtAuthMiddleWare,
  roleValidation("admin", "professor", "aluno"),
  bmiEvaluationController.getBmiEvaluations
);

router.get(
  "/:id",
  JwtAuthMiddleWare,
  roleValidation("admin", "professor"),
  validate(getBmiEvaluationSchema),
  bmiEvaluationController.getBmiEvaluation
);

router.post(
  "/",
  JwtAuthMiddleWare,
  roleValidation("admin", "professor"),
  validate(createBmiEvaluationSchema),
  bmiEvaluationController.createBmiEvaluation
);

router.put(
  "/:id",
  JwtAuthMiddleWare,
  roleValidation("admin", "professor"),
  validate(updateBmiEvaluationSchema),
  bmiEvaluationController.updateBmiEvaluation
);

router.delete(
  "/:id",
  JwtAuthMiddleWare,
  roleValidation("admin"),
  validate(deleteBmiEvaluationSchema),
  bmiEvaluationController.deleteBmiEvaluation
);

export default router;
