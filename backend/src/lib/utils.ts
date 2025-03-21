import { Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateToken = (userId: Types.ObjectId, res: Response) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("JWT_SECRET is not defined in environment variables.");
    res.status(500).send("Internal Server Error"); // Send an error response.
    return; // Stop execution
  }

  const token = jwt.sign({ userId }, secret, { expiresIn: "1h" });

  const maxAgeMilliseconds: number = 60 * 60 * 1000; // 1 hour in milliseconds

  res.cookie("jwt", token, {
    httpOnly: true, // Recommended for security
    secure: process.env.NODE_ENV === "production", // Recommended for production
    maxAge: maxAgeMilliseconds,
    sameSite: "none", // recommended security option,
  });
  return token;
};
