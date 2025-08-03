import { dbConnection } from "./dbcon/dbCon.js"
dbConnection()
import express from "express"
import { todoRoutes } from "./router/todoRouter.js"
import { ErrorHandler } from "./middleware/errorHandler.js"
import cors from "cors"
const app=express()

//middlewares


app.use(express.json())
const corsOptions={
  origin:true,
  credentials:true,
  method:['POST','GET','PATCH','DELETE'],
  allowedHeaders:['Content-Type','Authorization']
}
app.use(cors(corsOptions))
//routes
app.use("/api",todoRoutes)
 



app.use(ErrorHandler)
// app.use(validatior)
// listening
const port=999;
app.listen(port,()=>{
 console.log(`server is running at port ${port}`)
})