import { CreateUserUseCase } from '../application/useCases/CreateUserUseCase.ts';
import { GetUserByCifUseCase } from '../application/useCases/GetUserByCifUseCase.ts';
import { GetUserIdByCifrController } from './controllers/getUserIdByCifController.ts';
import { PostUserController } from './controllers/postUserController.ts';
import { UserPersistence } from './persistence/UserPersistence.ts';

const userPersistence = new UserPersistence();

export const createNewUser = new CreateUserUseCase(userPersistence);
export const getUserIdByCif = new GetUserByCifUseCase(userPersistence);
export const postUserController = new PostUserController(createNewUser);
export const getUserIdByCifController = new GetUserIdByCifrController(
  getUserIdByCif
);
