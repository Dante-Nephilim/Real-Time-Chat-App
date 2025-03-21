import express from "express";
import protectedRoute from "../middlewares/auth.middleware";
import { getUsersForSideBar, getMessages, sendMessage } from "../controllers/message.controller";

const router = express.Router();

router.get("/users", protectedRoute, getUsersForSideBar);

router.get("/:id", protectedRoute, getMessages);

router.post("/send/:id", protectedRoute, sendMessage);

export default router;
