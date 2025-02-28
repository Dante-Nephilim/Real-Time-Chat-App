import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      unique: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
      minlength: 8,
    },
    firstName: {
      required: true,
      type: String,
    },
    lastName: {
      required: true,
      type: String,
    },
    fullName: {
      type: String,
    },
    profilePic: {
      default: "",
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`;
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
