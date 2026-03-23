import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";
import { UserRole, UserStatus } from "./user.enum";
import type { IUserDocument } from "./user.interface";

const userSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // Query তে by default আসবে না
    },
    role: {
      type: String,
      enum: Object.values(UserRole), // UserRole এর মান গুলো থেকে একটি হতে হবে
      default: UserRole.MEMBER,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
    },
  },
  {
    timestamps: true, // createdAt এবং updatedAt ফিল্ড অটোমেটিক যোগ করবে
  },
);

// save করার আগে পাসওয়ার্ড হ্যাশ করার জন্য middleware
userSchema.pre("save", async function (this: IUserDocument) {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUserDocument>("User", userSchema);

export default User;
