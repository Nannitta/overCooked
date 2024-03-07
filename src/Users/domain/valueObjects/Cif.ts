import { MandatoryFieldException } from "../../../shared/domain/exceptions/MandatoryFieldException.ts";
import { CifFormatException } from "../exceptions/CifFormatException.ts";

export class Cif {
  public readonly cif: string;

  private constructor (cif: string) {
    this.cif = cif;
  }

  public static create(cif: string): Cif {
    const CIF_PATTERN = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;

    if(!cif) {
      throw new MandatoryFieldException("CIF");
    }
    if(!CIF_PATTERN.test(cif)) {
      throw new CifFormatException();
    }
    return new Cif(cif);
  }

  public getCif(): string {
    return this.cif;
  }
}
