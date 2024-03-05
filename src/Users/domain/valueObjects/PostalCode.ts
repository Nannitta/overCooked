import { throwError } from "../../../shared/infraestructure/utils/errorHelper.ts";

export class PostalCode {
  public readonly postalCode: string;

  private constructor(postalCode: string) {
    this.postalCode = postalCode;
  }

  public static create(postalCode: string): PostalCode {
    const POSTALCODE_PATTERN = /^\d{4,10}$/;

    if(!postalCode) {
      throw throwError("El código postal es obligatorio.", 403);
    }
    if(!POSTALCODE_PATTERN.test(postalCode)) {
      throw throwError("El código postal debe tener un formato válido.", 403);
    }
    return new PostalCode(postalCode);
  }

  public getPostalCode(): string {
    return this.postalCode;
  }
};
