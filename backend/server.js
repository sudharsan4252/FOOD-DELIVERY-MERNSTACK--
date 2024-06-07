import express from "express"
import cors from "cors"
import 'dotenv/config'
import { connectDB } from "./config/db.js"
import foodRoutes from "./routes/foodRoutes.js"
import userRouter from "./routes/userRoutes.js"
import cartRouter from "./routes/cartRoutes.js"
import orderRouter from "./routes/orderRoutes.js"


//app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//endpoint for testing
app.get("/",(req,res)=>{
    res.send("hello world")
})
//endpoints
app.use("/api/food",foodRoutes)
app.use("/images",express.static('upload'))
app.use("/api/data",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
//database connection
connectDB() 

//port listening
app.listen(port,()=>{
    console.log(`successfully running in the port http://localhost:${4000}`)
})