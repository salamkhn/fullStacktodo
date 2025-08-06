import jwt from "jsonwebtoken"


export const generatetokenandsaveincookie=async(id,res)=>{
  const token = jwt.sign({userId:id},process.env.JWT_KEY,{
    expiresIn:"1h"
  })
 
  // setting token in cookies
  res.cookie("jwt",token,{
    httpOnly:true,
    secure:false,
    sameSite:"lax",
    path:"/"
  })
   return token;
}