
import { json, success, z} from "zod"
import { user } from "../models/userModel.js"
import bcryptjs from "bcryptjs"
import  jwt  from "jsonwebtoken"
import { generatetokenandsaveincookie } from "./jwt/token.js"


  //userRegister schema
  export const registerSchema=z.object({
   username:z.string().min(3,{message:'userName should be 3 character long'}),
   email:z.email().min(4,{message:"email should be 4 character long"}),
   password:z.string().min(6,{message:"password should at_least  6 character long"})
  })


  //userlogin schema
  export const loginSchema=z.object({
      email:z.email().min(4,{message:"email should be 4 character long"}),
   password:z.string().min(6,{"message":"password should at_least  6 character long"})
  })


  // userRegistration
export const userRegister=async(req,res,next)=>{

  const {username,email,password}=req.body
   try{

     //Schema validation
    const validation=registerSchema.safeParse({username:username,email:email,password:password});
    if(!validation.success){

      const firsterror=validation.error.issues[0].message
      
      return res.status(400).json({
        message:firsterror,
        
        success:false
      })
    }

    //validation
    if(!username || !email || !password){
      return res.status(400).json({
        message:"all field are required",
        success:false
      })
    }
   
    //validation for already exist
    const exist=await user.findOne({email}).lean()
  
    if(exist){
      return res.status(409).json({
        message:"user already exist",
        success:false
      })
    }
    const hashedPassword=await bcryptjs.hash(password,10)
    const userData=user.create({
    username,
    email,
     password:hashedPassword
    })
   

   //success response
   return res.status(201).json({
     success:true,
    message:"user Registered Successfully",
    data:{
      id:(await userData)._id,
      username:(await userData).username,
      email:(await userData).email
    },
   })
   }catch(err){
   next(err)
   }
}

  //userLogin
  export const userLogin=async(req,res,next)=>{
    const {email,password}=req.body;
    try{
      
      const validation=loginSchema.safeParse({email,password})
  

      if(!validation.success){
        return res.status(400).json({
          message:"Invalid login details",
          error:validation.error._zod.def[0].message
        })
      }
 

      const exist=await user.findOne({email:validation.data.email});
      if(!exist){
        return res.status(409).json({
          message:"user Not found",
          success:false
        })
      }

      const decodedPassword=await bcryptjs.compare(validation.data.password, exist.password)
   if(!exist || !decodedPassword){
    return res.status(400).json({
      message:"invalid login details"
    })
   }

   //token generating
   const token=await generatetokenandsaveincookie(exist._id,res)



   return res.status(200).json({
    message:"user login successfully",
    exist,
    token

   })   
 }catch(err){
  next(err)
 }
  }