import express from "express";
import userController from "../controllers/userController";
import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from "../common/validations/userSchemas";
import { validate } from "../common/middlewares/validate";
import { JwtAuthMiddleWare } from "../common/middlewares/jwtMiddleware";

const router = express.Router();

router.get("/", JwtAuthMiddleWare, userController.getUsers);

router.get(
  "/:id",
  JwtAuthMiddleWare,
  validate(getUserSchema),
  userController.getUser
);

router.post(
  "/",
  JwtAuthMiddleWare,
  validate(createUserSchema),
  userController.createUser
);

router.put(
  "/:id",
  JwtAuthMiddleWare,
  validate(updateUserSchema),
  userController.updateUser
);

router.delete(
  "/:id",
  JwtAuthMiddleWare,
  validate(deleteUserSchema),
  userController.deleteUser
);

export default router;
