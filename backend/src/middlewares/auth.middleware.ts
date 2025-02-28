import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model.ts";
import { Request, Response, NextFunction, RequestHandler } from "express";

interface CustomRequest extends Request {
  user?: any;
}

const protectedRoute: RequestHandler = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ message: "Missing token" });
      return;
    } else {
      const secret = process.env.JWT_Secret;
      const decoded = jwt.verify(token, secret as string) as JwtPayload;
      if (!decoded) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        res.status(401).json({ message: "Invalid token" });
        return;
      } else {
        req.user = user;
        next();
      }
    }
  } catch (error) {
    res.status(401).send("Unauthorized");
    return;
  }
};

export default protectedRoute;
