
export const ErrorHandler=(err,req,res,next)=>{
    return res.status(500).json({
      message:"Internal server error",
      error:err.message,
      success:false
    })
}