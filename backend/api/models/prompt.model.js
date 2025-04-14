import mongoose from "mongoose";

const promptSchema = new mongoose.Schema({
    ownerID: {type: mongoose.Schema.Types.ObjectId, required: true, ref:"users"},
    text: {type: String, required: true}
},{timestamps: true})

export const promptModel = mongoose.model("prompts",promptSchema);