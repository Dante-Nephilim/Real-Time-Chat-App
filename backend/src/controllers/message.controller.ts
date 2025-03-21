import cloudinary from "../lib/cloudinary";
import { getReceiverSocketId, io } from "../lib/socket";
import { CustomRequest } from "../middlewares/auth.middleware";
import Message from "../models/message.model";
import User from "../models/user.model";
import { Request, Response } from "express";

export const getUsersForSideBar = async (req: CustomRequest, res: Response) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    res.status(200).json({ message: "Users fetched successfully", data: filteredUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req: CustomRequest, res: Response) => {
  try {
    const { id: userToChatId } = req.params;
    const loggedInUserId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: loggedInUserId },
      ],
    });
    res.status(200).json({ message: "Messages fetched successfully", data: messages });
  } catch (error) {
    console.log("Error in Message controller : getMessages" + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req: CustomRequest, res: Response) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const loggedInUserId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId: loggedInUserId,
      receiverId,
      text,
      imageUrl,
    });
    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({ message: "Message sent successfully", data: newMessage });
  } catch (error) {
    console.log("Error in Message controller : sendMessage" + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
