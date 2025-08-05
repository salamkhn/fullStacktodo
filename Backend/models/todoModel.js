
import mongoose  from "mongoose";

const todoSchema=mongoose.Schema({
   text:{
    type:String,
    required:true
   },
   completed:{
    type:Boolean,
    default:false
   },
   user:{
      type:mongoose.Schema.Types.ObjectId,  // Refrencing userModel to connect userCollection in mongodb
      ref:"user",
      required:true
   }
},{timestamps:true})

export const todo=mongoose.model("todo",todoSchema)