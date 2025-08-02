import { Router } from "express";
import { createTodo, getAlltodo } from "../controller/todoController.js";
import {z} from "zod"

export const todoRoutes=Router()
import { validatior } from "../middleware/validation.js";

const todoBodySchema=z.object({
   text:z.string().min(3,"atleast 3 character needed"),
   completed:z.boolean().optional()
}) 

const todoQuerySchema=z.object({
  completed:z.enum(["true","false"])
  .transform((val)=>val === "true").optional()
}).strict()
todoRoutes.post("/createTodo",validatior(todoBodySchema),createTodo)

todoRoutes.get("/getallTodo",validatior(todoQuerySchema),getAlltodo)