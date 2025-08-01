import express from "express";
import { validate } from "../common/middlewares/validate";
import userTokenController from "../controllers/userTokenController";
import {
  deleteUserTokenSchema,
  getUserTokenSchema,
  updateUserTokenSchema,
} from "../common/validations/userTokenSchemas";

const router = express.Router();

router.get("/", userTokenController.getUsersTokens);

router.get(
  "/:id",
  validate(getUserTokenSchema),
  userTokenController.getUserToken
);

router.post("/", userTokenController.createUserToken);

router.put(
  "/:id",
  validate(updateUserTokenSchema),
  userTokenController.updateUserToken
);

router.delete(
  "/:id",
  validate(deleteUserTokenSchema),
  userTokenController.deleteUserToken
);

export default router;
