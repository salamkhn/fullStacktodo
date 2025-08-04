import mongoose from "mongoose";

const userScehma=new mongoose.Schema({
 username:{
  type:String,
  required:true
 },
 email:{
   type:String,
   lowercase:true,
   required:true
 },
 password:{
  type:String,
  required:true
 }
},{timestamps:true})

export const user=mongoose.model("user",userScehma)