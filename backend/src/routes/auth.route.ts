import express from "express";
import { login, logout, register, updateProfile } from "../controllers/auth.controller.ts";
import protectedRoute from "../middlewares/auth.middleware.ts";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", protectedRoute, updateProfile);

export default router;
