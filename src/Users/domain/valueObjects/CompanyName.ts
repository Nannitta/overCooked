import { throwError } from "../../../shared/infraestructure/utils/errorHelper.ts";

export class CompanyName {
  public readonly companyName: string;

  private constructor(companyName: string) {
    this.companyName = companyName;
  }

  public static create(companyName: string): CompanyName {
    if(!companyName) throw throwError("El nombre de la empresa es obligatorio.", 403);
    if(companyName.length < 2 || companyName.length > 100) throw throwError("El nombre de la empresa debe tener entre 2 y 100 caracteres", 403);
    return new CompanyName(this.format(companyName));
  }

  public getCompanyName(): string {
    return this.companyName;
  }

  private static format(companyName: string): string {
    return companyName.trim().toLowerCase();
  }
}
