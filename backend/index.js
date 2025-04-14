import express from "express";
import "dotenv/config";
import { connectDB } from "./api/utils/connectDB.js";
import userRouter from "./api/routes/user.routes.js";

const app = express();
const port = process.env.PORT || 5000 ;

app.use(express.json());
connectDB();

app.use("/auth",userRouter)

app.get("/",(req,res)=>{
    res.send("Server running fine");
})

app.listen(port, ()=>console.log(`Server is on ${port}`));