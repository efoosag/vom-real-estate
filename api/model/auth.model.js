import User from "./user.mongo.js";
import bcryptjs from "bcryptjs";

// add new user
export const addNewUser = async(user) => {
  const { username, email, password } = user;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const formatedEmail = email.replace(email.split('@')[0], email.split('@')[0].toLowerCase());  
  const newUser = new User({username, email: formatedEmail, password: hashedPassword})
    return await newUser.save()  
}
