import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User from "../models/user.model";
import { generateToken } from "../lib/utils";
import cloudinary from "../lib/cloudinary";
import { CustomRequest } from "../middlewares/auth.middleware";

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, profilePic } = req.body;
    if (!email || !password || !firstName || !lastName) {
      res.status(400).json({ message: "Please fill all the fields" });
    }
    const emailIsAlreadyRegistered = await User.findOne({ email });
    if (password.length < 6) {
      res.status(400).json({ message: "Password must be at least 6 characters long" });
    } else if (emailIsAlreadyRegistered) {
      res.status(400).json({ message: "Email is already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password: hashedPassword, profilePic });
    if (user) {
      generateToken(user._id, res);
      await user.save();
      res.status(201).json({
        message: "Registered",
        data: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          email: user.email,
          profilePic: user.profilePic,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } else {
      res.status(400).json({ message: "User Data is not valid" });
    }
  } catch (error) {
    res.send(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Please fill all the fields" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid Credentials" });
    } else {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        res.status(400).json({ message: "Invalid Credentials" });
      } else {
        generateToken(user._id, res);
        res.status(200).json({
          message: "Login Successful",
          data: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        });
      }
    }
  } catch (error) {
    console.log("Error in login" + error);
    res.status(400).json({ message: "Something went wrong", error: error });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "Logged Out" });
  } catch (error) {
    console.log("Error in logout" + error);
  }
};

export const updateProfilePicture = async (req: CustomRequest, res: Response) => {
  console.log("Update Profile Picture");
  console.info(req.body);
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic) {
      res.status(400).json({ message: "Please provide a profile picture" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true });
    res.status(200).json({ message: "Profile updated successfully", data: updatedUser });
  } catch (error) {
    console.log("Error in updateProfile" + error);
  }
};

export const checkAuth = async (req: CustomRequest, res: Response) => {
  try {
    res.status(200).json({ message: "Auth Checked Successfully", data: req.user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
