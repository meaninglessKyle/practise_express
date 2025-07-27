import express from "express";
import {userCntrllr} from "@root/app/controllers/user/user.controller";


export const userRouter = express.Router();

userRouter.get("/getList", userCntrllr.getList);
userRouter.post("/add", userCntrllr.add);
userRouter.post("/del", userCntrllr.del);
userRouter.post("/edit", userCntrllr.edit);




