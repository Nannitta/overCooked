import express from 'express';
import type { Router } from 'express';
import {
  postUserController,
  getUserIdByCifController
} from '../../../Users/infraestructure/dependencies.ts';

const userRouter: Router = express.Router();

userRouter.post(
  '/register',
  getUserIdByCifController.execute.bind(getUserIdByCifController),
  postUserController.execute.bind(postUserController)
);

export { userRouter };
