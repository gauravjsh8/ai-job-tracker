import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  imageUrl?: string;
  publicImageId?: string;
  role: "user" | "admin";
  verificationToken: string;
  isVerified: boolean;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: number | null;
  resumeUrl?: string;
  resumePublicId?: string;
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },

    imageUrl: {
      type: String,
      default: "",
    },
    publicImageId: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: Boolean,
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Number,
      default: null,
    },
    resumeUrl: String,
    resumePublicId: String,
  },

  {
    timestamps: true,
  },
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
