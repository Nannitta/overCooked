import express from "express";
import type { Router } from "express";
import { postUserController } from "../../../Users/infraestructure/dependencies.ts";

const userRouter: Router = express.Router();

userRouter.post("/register", postUserController.execute.bind(postUserController));

export { userRouter };
