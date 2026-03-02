const jwt=require('jsonwebtoken')

const authMiddleware=async(req,res,next)=>{
    const{token}=req.headers
    if(!token){
        return res.status(401).json({success:false, message:"Not authorized, login again!"})
    }

    try{
        const decoded=jwt.verify(token, process.env.JWT_SECRET_KEY)
        // req.body.userId=decoded.userId
        //   console.log("Decoded ID:", decoded.id)
           req.userId=decoded.id
        next()
    }
    catch(err){
        console.log("authMiddlewareErr: ", err.message)
        res.status(500).json({success:false, message:"Something went wrong"})
    }
}

module.exports=authMiddleware