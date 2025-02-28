import express from "express";
import { checkAuth, login, logout, register, updateProfilePicture } from "./src/controllers/auth.controller.ts";
import protectedRoute from "./src/middlewares/auth.middleware.ts";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile-picture", protectedRoute, updateProfilePicture);

router.get("/check", protectedRoute, checkAuth);

export default router;
