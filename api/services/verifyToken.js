import jwt from "jsonwebtoken";

export const verifyToken = (req,res, next) => {
  const authHeader = req.headers.token 
  console.log(authHeader)  
  if(authHeader) {
    const token = authHeader.split(" ")[1]
    console.log(token)
    jwt.verify(token, process.env.JWT_SEC_KEY, (err, user) =>{      
      if(err) {
        console.log(err)
        return res.status(403).json('Unable to authenticate credentials')        
      }      
      req.user = user
      next()
    })
  }else {
   return res.status(401).json('Failed Authentication')
  }
}

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user.id, req.params.id)
    if(req.user.id === req.params.id){
      next()
    } else {      
      res.status(403).json('You1 are not Authorized to perform task on this account')
    }
  })
}