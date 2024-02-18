import express, { Router } from "express";
import { createUserController } from '../users/infrastructure/Ui/Http/CreateUserController.ts';

export const userRouter: Router = express.Router();

userRouter.post('/register', createUserController);
