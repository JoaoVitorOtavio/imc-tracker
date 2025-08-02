import express from "express";
import { validate } from "../common/middlewares/validate";
import bmiEvaluationController from "../controllers/bmiEvaluationController";
import {
  createBmiEvaluationSchema,
  deleteBmiEvaluationSchema,
  getBmiEvaluationSchema,
  updateBmiEvaluationSchema,
} from "../common/validations/bmiEvaluationSchemas";

const router = express.Router();

router.get("/", bmiEvaluationController.getBmiEvaluations);

router.get(
  "/:id",
  validate(getBmiEvaluationSchema),
  bmiEvaluationController.getBmiEvaluation
);

router.post(
  "/",
  validate(createBmiEvaluationSchema),
  bmiEvaluationController.createBmiEvaluation
);

router.put(
  "/:id",
  validate(updateBmiEvaluationSchema),
  bmiEvaluationController.updateBmiEvaluation
);

router.delete(
  "/:id",
  validate(deleteBmiEvaluationSchema),
  bmiEvaluationController.deleteBmiEvaluation
);

export default router;
