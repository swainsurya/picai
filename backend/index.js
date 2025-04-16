import express from "express";
import "dotenv/config";
import { connectDB } from "./api/utils/connectDB.js";
import userRouter from "./api/routes/user.routes.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000 ;

app.use(express.json());
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));
connectDB();


app.use("/auth",userRouter)

app.get("/",(req,res)=>{
    res.send("Server running fine");
})

app.listen(port, ()=>console.log(`Server is on ${port}`));