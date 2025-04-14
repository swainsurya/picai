import { Router } from "express";
import { genImage, login, register } from "../controllers/user.controllers.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const userRouter = Router();

userRouter.post("/login",login);
userRouter.post("/register",register);

userRouter.post("/genimg",verifyUser,genImage);

export default userRouter;