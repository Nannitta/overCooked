import { EmailFormatException } from "../../../shared/domain/exceptions/EmailFormatException.ts";
import { EmailLengthException } from "../../../shared/domain/exceptions/EmailLengthException.ts";

export class EmailSupplier {
  public readonly supplierEmail: string;

  private constructor (supplierEmail: string) {
    this.supplierEmail = supplierEmail;
  }

  public static create(supplierEmail: string | undefined): EmailSupplier | null {
    const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(supplierEmail) {
      if(!EMAIL_PATTERN.test(supplierEmail)) {
        throw new EmailFormatException();
      }
      if(supplierEmail.length > 100) {
        throw new EmailLengthException();
      }
      return new EmailSupplier(supplierEmail);
    }

    return null;
  }

  public getSupplierEmail(): string {
    return this.supplierEmail;
  }
};
