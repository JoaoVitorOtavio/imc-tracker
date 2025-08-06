import express from "express";
import { validate } from "../common/middlewares/validate";
import userTokenController from "../controllers/userTokenController";
import {
  createUserTokenSchema,
  deleteUserTokenSchema,
  getUserTokenSchema,
  updateUserTokenSchema,
} from "../common/validations/userTokenSchemas";
import { JwtAuthMiddleWare } from "../common/middlewares/jwtMiddleware";
import { roleValidation } from "../common/middlewares/roleValidation";

const router = express.Router();

router.get(
  "/",
  JwtAuthMiddleWare,
  roleValidation("admin"),
  userTokenController.getUsersTokens
);

router.get(
  "/:id",
  JwtAuthMiddleWare,
  roleValidation("admin"),
  validate(getUserTokenSchema),
  userTokenController.getUserToken
);

router.post(
  "/",
  JwtAuthMiddleWare,
  roleValidation("admin"),
  validate(createUserTokenSchema),
  userTokenController.createUserToken
);

router.put(
  "/:id",
  JwtAuthMiddleWare,
  roleValidation("admin"),
  validate(updateUserTokenSchema),
  userTokenController.updateUserToken
);

router.delete(
  "/:id",
  JwtAuthMiddleWare,
  roleValidation("admin"),
  validate(deleteUserTokenSchema),
  userTokenController.deleteUserToken
);

export default router;
