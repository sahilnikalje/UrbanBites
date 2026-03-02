const User=require('../models/userModel')

//todo add items to user cart
const addToCart=async(req,res)=>{
    try{
        let userData=await User.findById(req.userId)
        let cartData=userData.cartData

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1
        }
        else{
            cartData[req.body.itemId]+=1
        }
        await User.findByIdAndUpdate(req.userId, {cartData})
        res.status(200).json({success:true, message:"Added to cart"})
    }
    catch(err){
        console.log("addToCartErr: ",err.message)
        res.status(500).json({success:false, message:"Something went wrong"})
    }
}

//todo remove items from user cart
const removeFromCart=async(req,res)=>{
    try{
        let userData=await User.findById(req.userId)
        let cartData=userData.cartData
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId]-=1
        }

        await User.findByIdAndUpdate(req.userId, {cartData})
        res.status(200).json({success:true, message:"Removed from cart"})
    }
    catch(err){
        console.log("removeFromCartErr: ", err.message)
        res.status(400).json({success:false, message:"Something went wrong"})
    }
}

//todo fetch user cart data
const getCart=async(req,res)=>{
    try{
        let userData=await User.findById(req.userId)
        let cartData=await userData.cartData
        res.status(200).json({success:true, cartData})
    }
    catch(err){
        console.log("getCartErr: ", err.message)
        res.status(400).json({success:false, message:"Something went wrong"})
    }
}


module.exports={addToCart, removeFromCart, getCart}