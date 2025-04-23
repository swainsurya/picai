import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyUser = async(req, res, next) => {
    const {token} = req.body;
    if(!token) {
        return res.status(400).json({
            message: "Invalid token",
            status: false
        })
    }
    const decode = await jwt.decode(token,process.env.JWT_SK);
    if(!decode){
        return res.status(400).json({
            message: "Unauthorized user",
            status: false
        })
    }
    const {userid} = decode;
    localStorage.setItem("uid",userid);
    req.userid = userid;
    next();
}