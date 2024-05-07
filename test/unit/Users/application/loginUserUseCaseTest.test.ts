import { LoginUserUseCase } from "../../../../src/Users/application/useCases/LoginUserUseCase.ts";
import { ActivatedUserException } from "../../../../src/Users/domain/exceptions/ActivatedUserException.ts";
import { UserDoesntExist } from "../../../../src/Users/domain/exceptions/UserDoesntExist.ts";
import { CreateUserMother } from "../domain/mothers/createUserMother.ts";
import { LoginUserMother } from "../domain/mothers/loginUserMother.ts";
import { UserMother } from "../domain/mothers/userMother.ts";
import { LoginUserRepositoryInMemory } from "../infraestructure/persistence/LoginUserRepositoryInMemory.ts";

describe("Unit test to login user useCase", () => {
  let loginUserUseCase: LoginUserUseCase;
  let loginUserRepositoryInMemory: LoginUserRepositoryInMemory;

  beforeEach(() => {
    loginUserRepositoryInMemory = new LoginUserRepositoryInMemory();
    loginUserUseCase = new LoginUserUseCase(loginUserRepositoryInMemory);
  });

  it("Should throw an error when user doesn't exist", async () => {
    try {
      const loginUser = new LoginUserMother().random();

      await loginUserUseCase.execute(loginUser.email, loginUser.password);
    } catch (error) {
      expect(error).toBeInstanceOf(UserDoesntExist);
    }
  });

  it("Should throw an error when user isn't active", async () => {
    try {
      const user = new CreateUserMother().random();
      loginUserRepositoryInMemory.postLoginUserInMemory(user);

      await loginUserUseCase.execute(user.email, user.password);
    } catch (error) {
      expect(error).toBeInstanceOf(ActivatedUserException);
    }
  });

  it("Should login an user and create token", async () => {
    const user = new UserMother().random();
    loginUserRepositoryInMemory.postLoginUserInMemory(user);

    const token = await loginUserUseCase.execute(user.email, user.password);
    expect(token).toEqual(loginUserRepositoryInMemory.getUserToken(user));
  });
});
