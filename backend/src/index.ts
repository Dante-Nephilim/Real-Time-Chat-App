import { config } from "dotenv";
import express from "express";
import auth from "./routes/auth.route.ts";
import { connectDB } from "./lib/db.ts";

config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/auth", auth);

console.log(PORT);
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
