import { Router } from "express";
import { createTodo, deleteTodo, getAlltodo, updateTodo } from "../controller/todoController.js";
import {z} from "zod"

export const todoRoutes=Router()
import { validatior } from "../middleware/validation.js";

const todoBodySchema=z.object({
   text:z.string().min(3,"atleast 3 character needed").optional(),
   completed:z.boolean().optional()
}) 

const todoQuerySchema=z.object({
  completed:z.enum(["true","false"])
  .transform((val)=>val === "true").optional()
}).strict()

// @method=>post
// endpoing => api/createTodo
todoRoutes.post("/createTodo",validatior(todoBodySchema),createTodo)

// @method=>get
// endpoing => api/getalltodo
todoRoutes.get("/getallTodo",validatior(todoQuerySchema),getAlltodo)

//@method=>patch
// endopoint =>api/updatetodo/:id
todoRoutes.patch("/updatebyid/:id",validatior(todoBodySchema),updateTodo)

//@method=>delete
// endopoint =>api/updatetodo/:id
todoRoutes.delete("/deletebyid/:id",deleteTodo)