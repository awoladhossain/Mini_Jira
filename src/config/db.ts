import mongoose from "mongoose";
import { env } from "./env";

const connectDB = async (): Promise<void> => {
  const conn = await mongoose.connect(env.MONGODB_URI);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

export default connectDB;
