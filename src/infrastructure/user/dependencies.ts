import { CreateUserUseCase } from '../../application/user/useCases/CreateUserUseCase.ts';
import { UserRegisterController } from './controllers/userRegisterController.ts';

export const createNewUser = new CreateUserUseCase();
export const userRegisterController = new UserRegisterController(createNewUser);
