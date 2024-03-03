import { throwError } from "../../../shared/infraestructure/utils/errorHelper.ts";

export class Email {
  public readonly email: string;

  private constructor (email: string) {
    this.email = email;
  }

  public static create(email: string): Email {
    const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!email) {
      throw throwError("El email es obligatorio.", 403);
    }
    if(email.length > 100) {
      throw throwError("El email no puede tener más de 100 caracteres.", 403);
    }
    if(!EMAIL_PATTERN.test(email)) {
      throw throwError("El email debe tener un formato válido.", 403);
    }
    return new Email(email);
  }

  public getEmail(): string {
    return this.email;
  }
};
