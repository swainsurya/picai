import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async() => {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log("Mongodb Connected"))
    .catch(err=>console.log("DB error "+err))
}