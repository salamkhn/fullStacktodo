import express from "express"

const app=express()

//middlewares



//routes
app.get("/",(req,res)=>{
  res.json({
    message:"hello salamasdfasdfsdfdsfdsfdsfdsfa"
  })
})




// listening
const port=999;
app.listen(port,()=>{
 console.log(`server is running at port ${port}`)
})