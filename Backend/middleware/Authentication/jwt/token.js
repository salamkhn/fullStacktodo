import jwt from "jsonwebtoken"
import { user } from "../../../models/userModel.js"

export const generatetokenandsaveincookie=async(id,res)=>{
  const token = jwt.sign({userId:id},"s!a@l#a$m%",{
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