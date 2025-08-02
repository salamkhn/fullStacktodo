
import mongoose from "mongoose";

const todoSchema=mongoose.Schema({
   text:{
    type:String,
    required:true
   },
   completed:{
    type:Boolean,
    default:false
   }
},{timestamps:true})

export const todo=mongoose.model("todo",todoSchema)