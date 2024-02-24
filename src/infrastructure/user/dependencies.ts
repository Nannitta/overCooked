import { CreateUserUseCase } from '../../application/user/useCases/CreateUserUseCase.ts';
import { UserRegisterController } from './controllers/userRegisterController.ts';
import { UserRegisterPersistence } from './persistence/userRegisterPersistence.ts';

const userRegisterPersistence = new UserRegisterPersistence();

export const createNewUser = new CreateUserUseCase(userRegisterPersistence);
export const userRegisterController = new UserRegisterController(createNewUser);
