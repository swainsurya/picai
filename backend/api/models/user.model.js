import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    credits: {type:Number, default: 10}
})

export const userModel = mongoose.model("users",userSchema);