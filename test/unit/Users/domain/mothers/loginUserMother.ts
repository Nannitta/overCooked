import { LoginUser } from "../../../../../src/Users/domain/entities/LoginUser.ts";
import { Password } from "../../../../../src/Users/domain/valueObjects/Password.ts";
import { Email } from "../../../../../src/shared/domain/valueObjects/Email.ts";

export class LoginUserMother {
  public random = (): LoginUser => {
    const loginUser = LoginUser.login(
      Email.create("maraoxeeito54@ejemplo.com"),
      Password.create("Abcabc123!"),
    );
    return loginUser;
  };
};
