import { Router } from "express";
import { userLogin, userLogout, userRegister } from "../controller/userController.js";

export const userRouter=Router();


// @user=>registration
// method=>post
userRouter.post("/user/register",userRegister)

// @user=>login
// method=>post
userRouter.post("/user/login",userLogin)


// @user=>logout
// method=>
userRouter.get("/user/logout",userLogout)