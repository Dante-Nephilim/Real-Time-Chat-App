import express from "express";
import protectedRoute from "../middlewares/auth.middleware.ts";
import { getUsersForSideBar, getMessages, sendMessage } from "../controllers/message.controller.ts";

const router = express.Router();

router.get("/users", protectedRoute, getUsersForSideBar);
router.get("/:id", protectedRoute, getMessages);

router.post("/send/:id", protectedRoute, sendMessage);

export default router;
