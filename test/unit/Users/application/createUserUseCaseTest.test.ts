import { CreateUserUseCase } from "../../../../src/Users/application/useCases/CreateUserUseCase.ts";
import type { User } from "../../../../src/Users/domain/entities/User.ts";
import { CifAlreadyExistsException } from "../../../../src/shared/domain/exceptions/CifAlreadyExistsException.ts";
import { Cif } from "../../../../src/shared/domain/valueObjects/Cif.ts";
import { UserMother } from "../domain/mothers/userMother.ts";
import { UserRepositoryInMemory } from "../infraestructure/persistence/UserRepositoryInMemory.ts";

describe("Unit test to create user useCase", () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepositoryInMemory: UserRepositoryInMemory;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("Should throw an error when given an user's cif already exists", async () => {
    try {
      const user = new UserMother().random();

      await userRepositoryInMemory.postUser(user);

      await createUserUseCase.execute(user.companyName, user.CIF, user.email, user.password, user.role);
    } catch (error) {
      expect(error).toBeInstanceOf(CifAlreadyExistsException);
    }
  });

  it("Should create an user", async () => {
    const userRandom = new UserMother().random();

    await createUserUseCase.execute(userRandom.companyName, userRandom.CIF, userRandom.email, userRandom.password, userRandom.role);

    const user: User | null = await userRepositoryInMemory.getUserByCif(Cif.create(userRandom.CIF));

    expect(user?.CIF).toEqual(userRandom.CIF);
  });
});
