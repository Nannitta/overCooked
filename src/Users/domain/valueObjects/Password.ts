import { MandatoryFieldException } from "../../../shared/domain/exceptions/MandatoryFieldException.ts";
import { PasswordFormatException } from "../exceptions/PasswordFormatException.ts";

export class Password {
  public readonly password: string;

  private constructor (password: string) {
    this.password = password;
  }

  public static create(password: string): Password {
    const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zñÑ\d@$!%*?&]{8,20}$/;

    if(!password) {
      throw new MandatoryFieldException("contraseña");
    }
    if(!PASSWORD_PATTERN.test(password)) {
      throw new PasswordFormatException();
    }
    return new Password(password);
  }

  public getPassword(): string {
    return this.password;
  }
};
