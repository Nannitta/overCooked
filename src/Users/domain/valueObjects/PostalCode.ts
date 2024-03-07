import { MandatoryFieldException } from "../../../shared/domain/exceptions/MandatoryFieldException.ts";
import { PostalCodeFormatException } from "../exceptions/PostalCodeFormatException.ts";

export class PostalCode {
  public readonly postalCode: string;

  private constructor(postalCode: string) {
    this.postalCode = postalCode;
  }

  public static create(postalCode: string): PostalCode {
    const POSTALCODE_PATTERN = /^\d{4,10}$/;

    if(!postalCode) {
      throw new MandatoryFieldException("código postal");
    }
    if(!POSTALCODE_PATTERN.test(postalCode)) {
      throw new PostalCodeFormatException();
    }
    return new PostalCode(postalCode);
  }

  public getPostalCode(): string {
    return this.postalCode;
  }
};
