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
import { roleValidation } from "../common/middlewares/roleValidation";

const router = express.Router();

router.get(
  "/",
  roleValidation("admin", "professor"),
  JwtAuthMiddleWare,
  userController.getUsers
);

router.get(
  "/:id",
  JwtAuthMiddleWare,
  roleValidation("admin", "professor", "aluno"),
  validate(getUserSchema),
  userController.getUser
);

router.post(
  "/",
  JwtAuthMiddleWare,
  roleValidation("admin", "professor"),
  validate(createUserSchema),
  userController.createUser
);

router.put(
  "/:id",
  JwtAuthMiddleWare,
  roleValidation("admin", "professor"),
  validate(updateUserSchema),
  userController.updateUser
);

router.delete(
  "/:id",
  JwtAuthMiddleWare,
  roleValidation("admin"),
  validate(deleteUserSchema),
  userController.deleteUser
);

export default router;
