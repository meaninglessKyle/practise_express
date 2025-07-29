import express from "express";
import {userRouter} from "@root/app/routes/user/user.route";

export const router = express.Router();

router.use("/user", userRouter);
