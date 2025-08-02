
export const validatior=(todoSchema)=>(req,res,next)=>{
     const result=todoSchema.safeParse(req.method === "GET" ? req.query : req.body)
     if(!result.success ) return res.status(400).json({error:result.error.flatten()})
      req.validData=result.data
    next()
}