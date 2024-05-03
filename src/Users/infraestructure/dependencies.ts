import { CreateUserUseCase } from "../application/useCases/CreateUserUseCase.ts";
import { PostUserController } from "./controllers/postUserController.ts";
import { UserPersistence } from "./persistence/UserPersistence.ts";
import { LoginUserPersistence } from "./persistence/LoginUserPersistence.ts";
import { LoginUserController } from "./controllers/loginUserController.ts";
import { LoginUserUseCase } from "../application/useCases/LoginUserUseCase.ts";

const userPersistence = new UserPersistence();
const loginUserPersistence = new LoginUserPersistence();

export const createNewUser = new CreateUserUseCase(userPersistence);
export const postUserController = new PostUserController(createNewUser);
export const loginUser = new LoginUserUseCase(loginUserPersistence);
export const loginUserController = new LoginUserController(loginUser);
