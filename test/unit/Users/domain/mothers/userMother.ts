import { User } from "../../../../../src/Users/domain/entities/User.ts";
import { Address } from "../../../../../src/Users/domain/valueObjects/Address.ts";
import { Cif } from "../../../../../src/Users/domain/valueObjects/Cif.ts";
import { City } from "../../../../../src/Users/domain/valueObjects/City.ts";
import { CompanyName } from "../../../../../src/Users/domain/valueObjects/CompanyName.ts";
import { Country } from "../../../../../src/Users/domain/valueObjects/Country.ts";
import { Email } from "../../../../../src/Users/domain/valueObjects/Email.ts";
import { Password } from "../../../../../src/Users/domain/valueObjects/Password.ts";
import { Phone } from "../../../../../src/Users/domain/valueObjects/Phone.ts";
import { PostalCode } from "../../../../../src/Users/domain/valueObjects/PostalCode.ts";
import { Province } from "../../../../../src/Users/domain/valueObjects/Province.ts";
import { Role } from "../../../../../src/Users/domain/valueObjects/Role.ts";
import { Web } from "../../../../../src/Users/domain/valueObjects/Web.ts";

export class UserMother {
  public random = (): User => {
    const user = User.create(
      CompanyName.create("Ejemplo 1"),
      Cif.create("A1234567A"),
      Email.create("ejemplo1@gmail.com"),
      Password.create("ABCabc123!"),
      Phone.create("+34-695782146"),
      Address.create("Calle ejemplo, 123"),
      City.create("Ejemplo"),
      Country.create("España"),
      Province.create("Ejemplo"),
      PostalCode.create("12345"),
      Web.create("https://www.ejemplo1.com"),
      Role.create("Restaurante"),
    );
    return user;
  };
};
