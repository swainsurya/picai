import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateImage } from "../utils/generateImg.js";
import { promptModel } from "../models/prompt.model.js";

export const register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({
            message: "All fields are required"
        })
    }
    if (password.toString().length < 7) {
        return res.json({
            message: "Password must be more than 7"
        })
    }
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            return res.json({
                message: "User already exists",
                status: false
            })
        }
        const hashedPass = bcrypt.hashSync(password, 10);
        const newUser = new userModel({ email, password: hashedPass });
        await newUser.save();
        return res.status(200).json({
            message: "Registration Success",
            newUser,
            staus: true
        })
    } catch (error) {
        return res.status(400).json({
            message: "Internal server error",
            staus: false,
            error
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                staus: false
            })
        }
        const comparePass = await bcrypt.compareSync(password, user.password);
        if (!comparePass) {
            return res.status(400).json({
                message: "Password not match",
                staus: false
            })
        }
        const token = await jwt.sign({ userid: user._id }, process.env.JWT_SK, { expiresIn: "2d" });
        return res.status(200).json({
            message: "Login Success",
            user,
            token
        })
    } catch (error) {
        return res.status(400).json({
            message: "Internal server error",
            status: false
        })
    }
}

export const genImage = async (req, res) => {
    const { userid } = req;
    const { text } = req.body;
    if (!userid) {
        return res.status(400).json({
            message: "User not authorized",
            staus: false
        })
    }
    if (!text) {
        return res.json({
            message: "Please enter prompt"
        })
    }
    try {
        const user = await userModel.findById(userid);
        if(user?.credits <= 0){
            return res.status(400).json({
                message: "Insufficient Credits, buy credits",
                status: false
            })
        }
        const img = await generateImage(text);
        if (!img) {
            return res.json({
                message: "Image not generated"
            })
        }
        
        const image = `data:image/png;base64,${img.toString("base64")}`
        const userPrompt = new promptModel({ text, ownerID: userid });
        userPrompt.save();
        user.credits -= 1;
        await user.save();
        return res.json({
            message: "Image generated",
            prompt: text,
            image
        })

    } catch (error) {
        return res.status(400).json({
            message: "Internal server error",
            status: false,
            error
        })
    }
}