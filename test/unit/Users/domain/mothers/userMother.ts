import { User } from "../../../../../src/Users/domain/entities/User.ts";
import { Cif } from "../../../../../src/Users/domain/valueObjects/Cif.ts";
import { CompanyName } from "../../../../../src/Users/domain/valueObjects/CompanyName.ts";
import { Email } from "../../../../../src/Users/domain/valueObjects/Email.ts";
import { Password } from "../../../../../src/Users/domain/valueObjects/Password.ts";
import { Role } from "../../../../../src/Users/domain/valueObjects/Role.ts";

export class UserMother {
  public random = (): User => {
    const user = User.create(
      CompanyName.create("Ejemplo 1"),
      Cif.create("A1234567A"),
      Email.create("ejemplo1@gmail.com"),
      Password.create("ABCabc123!"),
      Role.create("Restaurante"),
    );
    return user;
  };
};
