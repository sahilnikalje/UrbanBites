const Food=require('../models/foodModel')
const fs=require('fs')

//todo add food item
const addFood=async(req,res)=>{
    //     if (!req.file) {
    //      console.error("File not received. Check field name.");
    //     return res.status(400).json({ success: false, message: "Image is required" });
    // }

    // console.log("Headers:", req.headers)
    // let image_filename = req.file.filename;
    let image_filename=`${req.file.filename}`

    const food=new Food({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try{
        await food.save()
        res.status(201).json({success:true, message:"Food added"})
    }
    catch(err){
        console.log("addFoodErr: ", err.message)
        res.status(500).json({success:false, message:"Something went wrong"})
    }
}
// ---------------------------------------------------------------------------------------------------------
//todo get all food list
const listFood=async(req,res)=>{
    try{
        const foods=await Food.find({})
        res.status(200).json({success:true, data:foods})
    }
    catch(err){
        console.log("listFoodErr: ", err.message)
        res.status(400).json({success:false, message:"Something went wrong"})
    }
}

//todo remove food item
const removeFood=async(req,res)=>{
    try{
        // if (!req.body) {
        //     return res.status(400).json({ success: false, message: "No body received" })
        // }
        const {id}=req.body

        if (!id) {
            return res.status(400).json({ success: false, message: "ID missing" })
        }

        const food=await Food.findById(id)

            if(!food){
               return res.status(200).json({success: true,message: "No item found",
            })
        }
        
        fs.unlink(`uploads/${food.image}`, ()=>{}) //todo delete from folder


        //todo delete from mongodb 
        await Food.findByIdAndDelete(id)
        res.status(200).json({success:true, message:"Removed Successfully"})
    }
    catch(err){
        console.log("removeFoodErr: ", err.message)
        res.status(400).json({success:false, message:"Something went wrong"})
    }
}




module.exports={addFood, listFood, removeFood}