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

const router = express.Router();

router.get("/", JwtAuthMiddleWare, bmiEvaluationController.getBmiEvaluations);

router.get(
  "/:id",
  JwtAuthMiddleWare,
  validate(getBmiEvaluationSchema),
  bmiEvaluationController.getBmiEvaluation
);

router.post(
  "/",
  JwtAuthMiddleWare,
  validate(createBmiEvaluationSchema),
  bmiEvaluationController.createBmiEvaluation
);

router.put(
  "/:id",
  JwtAuthMiddleWare,
  validate(updateBmiEvaluationSchema),
  bmiEvaluationController.updateBmiEvaluation
);

router.delete(
  "/:id",
  JwtAuthMiddleWare,
  validate(deleteBmiEvaluationSchema),
  bmiEvaluationController.deleteBmiEvaluation
);

export default router;
