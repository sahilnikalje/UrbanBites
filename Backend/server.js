const express=require('express')
const dotenv=require('dotenv').config()
const cors=require('cors')
const connectDB = require('./config/db')
const foodRouter = require('./routes/foodRoute')
const userRouter = require('./routes/userRoute')
const cartRouter = require('./routes/cartRoute')

//**app config
const app=express()
const PORT=process.env.PORT

//**middleware */
app.use(cors())
app.use(express.json())


app.get('/', (req,res)=>{
    res.send("API Working")
})

//**api endpoint
app.use('/api/food', foodRouter)
app.use('/images', express.static('uploads'))
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)

const startServer=async ()=>{
    try{
        await connectDB()
        app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`)
       })
    }
    catch(err){
        console.log("Error message: ", err.message)
        process.exit(1)
    }
}
startServer()