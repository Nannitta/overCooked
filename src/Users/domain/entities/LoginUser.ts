import type { Email } from "../../../shared/domain/valueObjects/Email.ts";
import type { Password } from "../valueObjects/Password.ts";

export class LoginUser {
  private constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  public static login(
    email: Email,
    password: Password,
  ): LoginUser {
    return new LoginUser(
      email.getEmail(),
      password.getPassword(),
    );
  }
}
