const User=require('../models/userModel')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const validator=require('validator')

//todo create token
const createToken=(id)=>{
    return jwt.sign(
        {id},
        process.env.JWT_SECRET_KEY,
        {expiresIn:'1d'}
    )
}

//todo register user
const registerUser=async(req,res)=>{
    const{name, password, email}=req.body
    try{
        if(!name || !email || !password){
          return res.status(400).json({success:false, message:"All fields are mandetory"})
        }

        const exists=await User.findOne({email})
        if(exists){
            return res.status(409).json({success:false, message:"User already exist"})
        }

        //! validate email format and strong password
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false, message:"Please enter valid email"})
        }

        //! password length
        if(password.length<6){
            return res.status(400).json({success:false, message:"Please enter a strong password"})
        }

        //todo everything's good-create account
        //todo hash password
        const hashedPassword=await bcrypt.hash(password, 10)

        //todo create new user
        const newUser=new User({
            name:name,
            email:email,
            password:hashedPassword
        })

        //todo save the user
        const user=await newUser.save()

        //todo generate token
        const token=createToken(user._id)
        res.status(200).json({success:true, token})
    }
    catch(err){
        console.log("registerErr: ", err.message)
        res.status(500).json({success:false, message:"Something went wrong"})
    }
}


//todo Login user
const loginUser=async(req,res)=>{
    const{email, password}=req.body
    try{
        if(!email || !password){
          return res.status(400).json({success:false, message:"All fields are mandetory"})
        }

        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({success:false, message:"User not found"})
        }

        const isMatch=await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(403).json({success:false, message:"Invalid Credentials"})
        }

        const token=createToken(user._id)

        res.status(201).json({success:true, token})
    }
    catch(err){
        console.log("loginErr: ", err.message)
        res.status(500).json({success:false, message:"Something went wrong"})
    }
}

module.exports={registerUser, loginUser}