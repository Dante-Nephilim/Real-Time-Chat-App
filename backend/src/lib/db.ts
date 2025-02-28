import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || "", {});
    console.info("Connected to DB");
  } catch (error) {
    console.log("Error Connecting To DB" + error);
  }
};
