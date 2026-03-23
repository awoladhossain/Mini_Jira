import User from "./user.model";
import type {
  SafeUser,
  RegisterInput,
  UpdateUserInput,
} from "./user.interface";
import AppError from "../../shared/utils/AppError";


const sanitizeUser =(user:any): SafeUser =>{
  const { password, ...safeUser } = user.toObject(); // password ফিল্ড বাদ দিয়ে বাকি সব ফিল্ড safeUser তে রাখবে
  return safeUser as SafeUser; // Type assertion দিয়ে SafeUser টাইপে কাস্ট করা
}
