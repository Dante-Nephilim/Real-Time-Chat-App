import express from "express";
import { login, logout, register, updateProfilePicture, checkAuth } from "../controllers/auth.controller";
import protectedRoute from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile-picture", protectedRoute, updateProfilePicture);

router.get("/check", protectedRoute, checkAuth);

export default router;
