import { Email } from "../../../shared/domain/valueObjects/Email.ts";
import { LoginUser } from "../../domain/entities/LoginUser.ts";
import { ActivatedUserException } from "../../domain/exceptions/ActivatedUserException.ts";
import { UserDoesntExist } from "../../domain/exceptions/UserDoesntExist.ts";
import type { LoginUserRepository } from "../../domain/repositories/LoginUserRepository.ts";
import { Password } from "../../domain/valueObjects/Password.ts";

export class LoginUserUseCase {
  constructor(private readonly loginRepository: LoginUserRepository) {}

  execute = async (
    email: string,
    password: string,
  ): Promise<string> => {
    const emailPersistence = Email.create(email);
    const passwordPersistence = Password.create(password);
    const loginUserToCheck = LoginUser.login(emailPersistence, passwordPersistence);

    const checkUser = await this.loginRepository.checkUserExists(loginUserToCheck);

    if(!checkUser) throw new UserDoesntExist();

    const activatedUser = await this.loginRepository.getActivatedUser(emailPersistence);

    if(!activatedUser) throw new ActivatedUserException();

    const token = this.loginRepository.getUserToken(checkUser);

    return token;
  };
};
