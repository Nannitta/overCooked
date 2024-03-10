import { CreateUserUseCase } from "../../../../src/Users/application/useCases/CreateUserUseCase.ts";
import type { User } from "../../../../src/Users/domain/entities/User.ts";
import { CifAlreadyExistsException } from "../../../../src/Users/domain/exceptions/CifAlreadyExistsException.ts";
import { Cif } from "../../../../src/Users/domain/valueObjects/Cif.ts";
import { UserRepositoryInMemory } from "../infraestructure/persistence/UserRepositoryInMemory.ts";

describe("Unit test to create user useCase", () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepositoryInMemory: UserRepositoryInMemory;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("Should create an user", async () => {
    const exampleUser1 = {
      companyName: "Ejemplo 1",
      cif: "A1234567A",
      email: "ejemplo1@gmail.com",
      password: "ABCabc123!",
      phone: "+34-695782146",
      address: "Calle ejemplo, 123",
      city: "Ejemplo",
      country: "España",
      province: "Ejemplo",
      postalCode: "12345",
      web: "https://www.ejemplo1.com",
      role: "Restaurante"
    };
    await createUserUseCase.execute(exampleUser1.companyName, exampleUser1.cif, exampleUser1.email, exampleUser1.password, exampleUser1.phone,
      exampleUser1.address, exampleUser1.city, exampleUser1.country, exampleUser1.province, exampleUser1.postalCode, exampleUser1.role, exampleUser1.web);

    const user: User | null = await userRepositoryInMemory.getUserByCif(Cif.create(exampleUser1.cif));

    expect(user?.cif).toEqual(exampleUser1.cif);
  });

  it("Should throw an error when given an user's cif already exists", async () => {
    const exampleUser1 = {
      companyName: "Ejemplo 1",
      cif: "A1234567A",
      email: "ejemplo1@gmail.com",
      password: "ABCabc123!",
      phone: "+34-695782146",
      address: "Calle ejemplo, 123",
      city: "Ejemplo",
      country: "España",
      province: "Ejemplo",
      postalCode: "12345",
      web: "https://www.ejemplo1.com",
      role: "Restaurante"
    };

    const exampleUser2 = {
      companyName: "Ejemplo 2",
      cif: "A1234567A",
      email: "ejemplo2@gmail.com",
      password: "ABCabc123!",
      phone: "+34-695782246",
      address: "Calle ejemplo, 123",
      city: "Ejemplo",
      country: "España",
      province: "Ejemplo",
      postalCode: "12345",
      web: "https://www.ejemplo2.com",
      role: "Restaurante"
    };
    try {
      await createUserUseCase.execute(exampleUser1.companyName, exampleUser1.cif, exampleUser1.email, exampleUser1.password, exampleUser1.phone,
        exampleUser1.address, exampleUser1.city, exampleUser1.country, exampleUser1.province, exampleUser1.postalCode, exampleUser1.role, exampleUser1.web);

      await createUserUseCase.execute(exampleUser2.companyName, exampleUser2.cif, exampleUser2.email, exampleUser2.password, exampleUser2.phone,
        exampleUser2.address, exampleUser2.city, exampleUser2.country, exampleUser2.province, exampleUser2.postalCode, exampleUser2.role, exampleUser2.web);
    } catch (error) {
      expect(error).toBeInstanceOf(CifAlreadyExistsException);
    }
  });
});
