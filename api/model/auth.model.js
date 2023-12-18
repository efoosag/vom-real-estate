import { response } from "express";
import User from "./user.mongo.js";
import bcryptjs from "bcryptjs";

// add new user
export const addNewUser = async(user) => {
  const { username, email, password } = user;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  try {  
    const newUser = new User({username, email, password: hashedPassword})
    return await newUser.save()
  }catch(err){
    return err.message
  }
}
