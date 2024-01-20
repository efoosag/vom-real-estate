import { updateUser, deleteUser } from "../model/user.model.js"

export const test = (req, res) => {
  res.json({message:"Api routes is working"})
}

export const httpUpdateUser = async (req, res) => {    
  try {  
    const updatedUser = await updateUser(req.params.id, req.body)
    return res.status(200).json(updatedUser)
  }catch(err){
    return res.status(500).json(err.message)
  }  
}

export const httpDeleteUser = async (req,res) => {
  try {  
    const deletedUser = await deleteUser(req.params.id)
    return res.status(200).json(deletedUser)
  }catch(err){
    return res.status(500).json(err.message)
  }
}