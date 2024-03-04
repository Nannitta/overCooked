import { throwError } from "../../../shared/infraestructure/utils/errorHelper.ts";

export class Password {
  public readonly password: string;

  private constructor (password: string) {
    this.password = password;
  }

  public static create(password: string): Password {
    const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zñÑ\d@$!%*?&]{8,20}$/;

    if(!password) {
      throw throwError("La contraseña es obligatoria.", 403);
    }
    if(!PASSWORD_PATTERN.test(password)) {
      throw throwError("La contraseña debe tener entre 8 y 20 caracteres, contener una minúscula, una mayúscula, un número y un caracter especial.", 403);
    }
    return new Password(password);
  }

  public getPassword(): string {
    return this.password;
  }
};
