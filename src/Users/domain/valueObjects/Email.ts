import { MandatoryFieldException } from "../../../shared/domain/exceptions/MandatoryFieldException.ts";
import { EmailFormatException } from "../exceptions/EmailFormatException.ts";
import { EmailLengthException } from "../exceptions/EmailLengthException.ts";

export class Email {
  public readonly email: string;

  private constructor (email: string) {
    this.email = email;
  }

  public static create(email: string): Email {
    const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!email) {
      throw new MandatoryFieldException("email");
    }
    if(email.length > 100) {
      throw new EmailLengthException();
    }
    if(!EMAIL_PATTERN.test(email)) {
      throw new EmailFormatException();
    }
    return new Email(email);
  }

  public getEmail(): string {
    return this.email;
  }
};
