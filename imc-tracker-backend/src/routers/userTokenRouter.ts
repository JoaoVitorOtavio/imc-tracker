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

const router = express.Router();

router.get("/", JwtAuthMiddleWare, userTokenController.getUsersTokens);

router.get(
  "/:id",
  JwtAuthMiddleWare,
  validate(getUserTokenSchema),
  userTokenController.getUserToken
);

router.post(
  "/",
  JwtAuthMiddleWare,
  validate(createUserTokenSchema),
  userTokenController.createUserToken
);

router.put(
  "/:id",
  JwtAuthMiddleWare,
  validate(updateUserTokenSchema),
  userTokenController.updateUserToken
);

router.delete(
  "/:id",
  JwtAuthMiddleWare,
  validate(deleteUserTokenSchema),
  userTokenController.deleteUserToken
);

export default router;
