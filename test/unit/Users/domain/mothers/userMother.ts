import { User } from "../../../../../src/Users/domain/entities/User.ts";
import { Cif } from "../../../../../src/shared/domain/valueObjects/Cif.ts";
import { CompanyName } from "../../../../../src/shared/domain/valueObjects/CompanyName.ts";
import { Email } from "../../../../../src/shared/domain/valueObjects/Email.ts";
import { Password } from "../../../../../src/Users/domain/valueObjects/Password.ts";
import { Role } from "../../../../../src/Users/domain/valueObjects/Role.ts";
import { generateUUID } from "../../../../../src/shared/infraestructure/utils/generateUUID.ts";

export class UserMother {
  public random = (): User => {
    const userId = generateUUID();
    const activationCode = generateUUID();
    const createdAt = new Date();
    const user = User.create(
      CompanyName.create("Ejemplo 1"),
      Cif.create("A1234567A"),
      Email.create("ejemplo1@gmail.com"),
      Password.create("ABCabc123!"),
      Role.create("Restaurante"),
      userId,
      activationCode,
      createdAt
    );
    return user;
  };
};
