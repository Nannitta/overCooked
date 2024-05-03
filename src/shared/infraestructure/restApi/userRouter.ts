import express from "express";
import type { Router } from "express";
import { loginUserController, postUserController } from "../../../Users/infraestructure/dependencies.ts";

const userRouter: Router = express.Router();

userRouter.post("/register", postUserController.execute.bind(postUserController));
userRouter.post("/login", loginUserController.execute.bind(loginUserController));

export { userRouter };
