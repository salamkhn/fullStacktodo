import mongoose from "mongoose";

export const dbConnection=async()=>{
  try{
    mongoose.connect(process.env.DBS_URI)
    console.log("dbs connected successfully")
  }catch(err){
   console.log(err.message)
  }
}