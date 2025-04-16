import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    credits: {type:Number, default: 10},
    membership:{type:String, enum:["premium","pro","free"], default:"free"}
})

export const userModel = mongoose.model("users",userSchema);