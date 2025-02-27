import express from "express";

const router = express.Router();

router.post("/register", (req, res) => {
  console.log(req.body);
  res.send("Registered");
});

router.post("/login", (req, res) => {
  console.log(req.body);
  res.send("Logged in");
});

router.post("/logout", (req, res) => {
  console.log(req.body);
  res.send("Logged out");
});

export default router;
