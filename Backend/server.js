import { dbConnection } from "./dbcon/dbCon.js"
dbConnection()
import express from "express"
import { todoRoutes } from "./router/todoRouter.js"
import { ErrorHandler } from "./middleware/errorHandler.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import { userRouter } from "./router/userRouter.js"
const app=express()

//middlewares
app.use(express.json())
app.use(cookieParser())
const corsOptions={
  origin:true,
  credentials:true,
  method:['POST','GET','PATCH','DELETE'],
  allowedHeaders:['Content-Type','Authorization']
}
app.use(cors(corsOptions))

//routes

//Todo Routes
app.use("/api",todoRoutes)

//user Routes
app.use("/api",userRouter)


app.use(ErrorHandler)
// app.use(validatior)
// listening
const port=999;
app.listen(port,()=>{
 console.log(`server is running at port ${port}`)
})