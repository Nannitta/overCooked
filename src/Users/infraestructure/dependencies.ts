import { CreateUserUseCase } from "../application/useCases/CreateUserUseCase.ts";
import { PostUserController } from "./controllers/postUserController.ts";
import { UserPersistence } from "./persistence/UserPersistence.ts";

const userPersistence = new UserPersistence();

export const createNewUser = new CreateUserUseCase(userPersistence);
export const postUserController = new PostUserController(createNewUser);
