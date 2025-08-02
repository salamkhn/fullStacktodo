

import { success } from "zod";
import { todo } from "../models/todoModel.js"

// Create todo
export const createTodo=async(req,res,next)=>{
 try{
   const {text,completed}=req.validData
   console.log("req.validData :",req.validData)
   const newtodo=new todo({
    text,
    completed
   });

  // save to dbs
  await newtodo.save()

  //success status
  return res.status(201).json({
    message:"user todo created successfully",
    newtodo,
    success:true
  })

 }catch(err){
 next(err)
 }
}

//Get Alltodo
export const getAlltodo=async(req,res,next)=>{
  const {completed}=req.validData;
   
  const filter={};
  if(completed !== undefined){
   filter.completed=completed
  }
  console.log('filter :',filter)
   try{
      const alltodos=await todo.find(filter);

      if(!alltodos || alltodos.length === 0){
        return res.status(400).json({
          message:"No data found",
          success:false
        })
      } 
  console.log("alltodos :",alltodos)

  //success response
  return res.status(200).json({
    message:"data fetched successfully from dbs",
    success:true,
    alltodos
  })
   }catch(err){
    next(err)
   }
}