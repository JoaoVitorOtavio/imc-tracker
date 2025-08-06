import { Router } from "express";
import authController from "../controllers/authController";

const router = Router();

router.post("/login", authController.login);
router.post("/refresh/access/token", authController.refreshAccessToken);
router.post("/logout", authController.logout);

export default router;
