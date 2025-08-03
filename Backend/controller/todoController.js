
import { todo } from "../models/todoModel.js"
import mongoose from "mongoose";

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

// update todo
export const updateTodo=async(req,res,next)=>{
  const id=req.params.id;

  try{
     const updateData=req.validData;
     if(!updateData || Object.keys(updateData).length ==0){
      return res.status(404).json({
        message:"atleast one field required",
        success:false
      })
     }
    const todoData=await todo.findByIdAndUpdate(id,updateData,{new:true})
     
    if(!todoData){
      return res.status(400).json({
        message:"todo not find with this id",
        updateData,
        success:false
        
      })
    }

    //success response
    return res.status(200).json({
      message:"todo updated successfully",
      success:true
    })
   
  }catch(err){
    next(err)
  }
}

//Delete todo
export const deleteTodo=async(req,res,next)=>{
  const id=req.params.id;
 try{
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({
      message:"Invalid todo id formate",
      success:false
    })
  }
  const DeleteTodo=await todo.findByIdAndDelete(id)
  if(!DeleteTodo || DeleteTodo.length ==0){
    return res.status(404).json({
     message:"not any todo found with this id",
     success:false
    })
  }
  //success reponse
  return res.status(200).json({
    message:"todo deleted successfully with this id",
    success:true
  })
 }catch(err){
  next(err)
 }
}