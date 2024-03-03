import { throwError } from "../../../shared/infraestructure/utils/errorHelper.ts";

export class Cif {
  public readonly cif: string;

  private constructor (cif: string) {
    this.cif = cif;
  }

  public static create(cif: string): Cif {
    const CIF_PATTERN = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;

    if(!cif) {
      throw throwError("El CIF de la empresa es obligatorio.", 403);
    }
    if(!CIF_PATTERN.test(cif)) {
      throw throwError("El CIF debe tener un formato válido.", 403);
    }
    return new Cif(cif);
  }

  public getCif(): string {
    return this.cif;
  }
}
