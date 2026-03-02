const Order=require('../models/orderModel')
const User=require('../models/userModel')
const Stripe=require('stripe')

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
//todo placing user order from frontend
const placeOrder=async(req,res)=>{
    const frontend_url=process.env.FRONTEND_URL

    try{
        const newOrder=new Order({
            userId:req.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save()
        
        //todo after placing the order, clear the cart
        await User.findByIdAndUpdate(req.userId, {cartData:{}})

        //todo create lineitems for payment link
        const line_items=req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100   //! multiplying by 100 to convert dollers to inr
            },
            quantity:item.quantity
        }))
        
        //todo push delivery charges also
        line_items.push({
            price_data:{
                currency:'inr',
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:40*100
            },
            quantity:1
        })

        const session=await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        res.status(201).json({success:true, session_url:session.url})
    }
    catch(err){
        console.log("placeOrderErr: ", err.message)
        res.status(400).json({success:false, message:"Something went wrong"})
    }
}


//! tempory payment verification system
//todo ideally we should use webhooks
const verifyOrder=async(req,res)=>{
    const {orderId, success}=req.body

    try{
        if(success==="true"){
            await Order.findByIdAndUpdate(orderId, {payment:true})
            res.status(200).json({success:true, message:"Paid Successfully"})
        }
        else{
            await Order.findByIdAndDelete(orderId)
            res.status(200).json({success:false, message:"Payment Cancelled"})
        }
    }
    catch(err){
        console.log("verifyOrderErr: ", err.message)
        res.status(400).json({success:false, message:"Something went wrong"})
    }
}

//todo user orders for frontend
const userOrders=async(req,res)=>{
    try{
        const orders=await Order.find({userId:req.userId})
        res.status(200).json({success:true, data:orders})
    }
    catch(err){
        console.log("userOrdersErr: ", err.message)
        res.status(400).json({success:false, message:"Something went wrong"})
    }
}

//todo listing orders for admin panel
const listOrders=async(req, res)=>{
    try{
        const orders=await Order.find({})
        res.status(200).json({success:true, data:orders})
    }
    catch(err){
        console.log("listOrdersErr: ", err.message)
        res.status(400).json({success:false, message:"Something went wrong"})
    }
}


//todo api to update order status from admin panel 
const updateStatus=async(req,res)=>{
    try{
        // console.log(req.body.orderId)
        await Order.findByIdAndUpdate(req.body.orderId, {status:req.body.status})
        res.status(200).json({success:true, message:"Status Updated"})
    }
    catch(err){
        console.log("updateStatusErr: ", err.message)
        res.status(400).json({success:false, message:"Something went wrong"})
    }
}



module.exports={placeOrder, verifyOrder, userOrders, listOrders, updateStatus}