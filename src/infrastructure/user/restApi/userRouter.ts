import express from 'express';
import type { Router } from 'express';
import { userRegisterController } from '../dependencies.ts';

const userRouter: Router = express.Router();

userRouter.post('/register', userRegisterController.execute.bind(userRegisterController));

export { userRouter };
