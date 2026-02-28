const express=require('express')
const multer=require('multer')
const path=require('path')
const fs = require("fs")

const {addFood, listFood, removeFood}=require('../controllers/foodController')

const foodRouter=express.Router()

const uploadDir = path.join(__dirname, "../uploads")

// Ensure directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        // cb(null, Date.now() + "-" + file.originalname)
        cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage })
//**image storage engine */
//! code to upload and store the images
// const storage=multer.diskStorage({
//     destination:"uploads",
//     //  destination: function (req, file, cb) {
//     //   cb(null, path.join(__dirname, "../uploads"));
//     // },
//     filename:(req, file, cb)=>{
//         return cb(null, `${Date.now()}${file.originalname}`)
//     }
// })

// const upload=multer({storage:storage}) //**this is a middleware */

foodRouter.post('/add',upload.single("image"), addFood)
// foodRouter.post('/add', upload.any(), (req, res) => {
//     console.log("FILES:", req.files)
//     console.log("BODY:", req.body)
//     res.send("Check console")
// })

foodRouter.get('/list', listFood)
foodRouter.post('/remove', removeFood)




module.exports=foodRouter