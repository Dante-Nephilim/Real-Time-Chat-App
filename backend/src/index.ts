import { config } from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.route.ts";
import messageRoutes from "./routes/message.route.ts";
import { connectDB } from "./lib/db.ts";
import cookieParser from "cookie-parser";
import cors from "cors";

config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
