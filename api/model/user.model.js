import User from "./user.mongo.js";
import bcryptjs from "bcryptjs";

export async function updateUser(id, user) {  
  if(user.password){ user.password = bcryptjs.hashSync(user.password, 10)}
  if(user.email){user.email = user.email.replace(user.email.split('@')[0], user.email.split('@')[0].toLowerCase())};   
  const updateUserDetails = await User.findByIdAndUpdate(id, {
   $set: {
    username: user.username,
    email: user.email,
    password: user.password,
    avatar: user.avatar,
   },
  }, {new: true})
  const { password, ...others} = updateUserDetails._doc

  return {...others}
}

export async function deleteUser(id) {
  const deleteUser = await User.findByIdAndDelete(id)
  if (!deleteUser){
    return "User not found"
  }
  return deleteUser
}

