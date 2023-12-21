import { addNewUser } from '../model/auth.model.js'

export const httpSignUp = async (req, res) => {  
  if(req.body.username === null || req.body.email === null || req.body.password === null){    
    return res.status(500).json('Missing required details')
  } else {  
    try {  
      const savedNewUser = await addNewUser(req.body)
      return res.status(200).json(savedNewUser)
    }catch(err){
      return res.status(500).json(err.message)
    }    
  }
}






// module.exports = {
//   httpSignUp,
// }