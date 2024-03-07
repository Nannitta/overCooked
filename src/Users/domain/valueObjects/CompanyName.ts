import { MandatoryFieldException } from "../../../shared/domain/exceptions/MandatoryFieldException.ts";
import { CompanyNameLengthException } from "../exceptions/CompanyNameLengthException.ts";

export class CompanyName {
  public readonly companyName: string;

  private constructor(companyName: string) {
    this.companyName = companyName;
  }

  public static create(companyName: string): CompanyName {
    if(!companyName) {
      throw new MandatoryFieldException("nombre de la compañia");
    }
    if(companyName.length < 2 || companyName.length > 100) {
      throw new CompanyNameLengthException();
    }
    return new CompanyName(this.format(companyName));
  }

  public getCompanyName(): string {
    return this.companyName;
  }

  private static format(companyName: string): string {
    return companyName.trim();
  }
}
