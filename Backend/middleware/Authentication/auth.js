import jwt from "jsonwebtoken"
export const Authentication=(req,res,next)=>{


  const token=req.cookies?.jwt
   
  if(!token){
    return res.status(401).json({
      message:"Login first",
      success:false
    })
  }


  const decoded=jwt.verify(token,"s!a@l#a$m%");

  if(!decoded){
    return res.status(401).json({
      message:"Invalid token && unauthorized",
      success:false
    })
  }

  req.userId=decoded.userId

  next()


}