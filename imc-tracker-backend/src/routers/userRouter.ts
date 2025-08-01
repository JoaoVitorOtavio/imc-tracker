import express from "express";
import userController from "../controllers/userController";
import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from "../common/validations/userSchemas";
import { validate } from "../common/middlewares/validate";

const router = express.Router();

router.get("/", userController.getUsers);

router.get("/:id", validate(getUserSchema), userController.getUser);

router.post("/", validate(createUserSchema), userController.createUser);

router.put("/:id", validate(updateUserSchema), userController.updateUser);

router.delete("/:id", validate(deleteUserSchema), userController.deleteUser);

export default router;
