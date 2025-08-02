import { dbConnection } from "./dbcon/dbCon.js"
dbConnection()
import express from "express"
import { todoRoutes } from "./router/todoRouter.js"
import { ErrorHandler } from "./middleware/errorHandler.js"
import { validatior } from "./middleware/validation.js"
const app=express()

//middlewares


app.use(express.json())
//routes
app.use("/api",todoRoutes)




app.use(ErrorHandler)
// app.use(validatior)
// listening
const port=999;
app.listen(port,()=>{
 console.log(`server is running at port ${port}`)
})