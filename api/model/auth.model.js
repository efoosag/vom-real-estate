import User from "./user.mongo.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// add new user
export const addNewUser = async(user) => {
  const { username, email, password } = user;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const formatedEmail = email.replace(email.split('@')[0], email.split('@')[0].toLowerCase());  
  const newUser = new User({username, email: formatedEmail, password: hashedPassword})
    return await newUser.save()  
}

export const signInUser = async(user) => {     
  const validateUserEmail = await User.findOne({email: user.email})
  if(!validateUserEmail) throw new Error('User Not Found')

  const validateUserPassword = bcryptjs.compareSync(user.password, validateUserEmail.password)
  if(!validateUserPassword) throw new Error('Wrong Credentials Provided')

  const accesstoken = jwt.sign(
    {
      id: validateUserEmail._id,        
    },
    process.env.JWT_SEC_KEY,
    {
      expiresIn: "3d"
    }
  )
  const { password, ...userOtherDetails} = validateUserEmail._doc //return details without password
    
  return {...userOtherDetails, accesstoken}
}
