import { MandatoryFieldException } from "../../../shared/domain/exceptions/MandatoryFieldException.ts";
import { CifFormatException } from "../exceptions/CifFormatException.ts";

export class Cif {
  public readonly CIF: string;

  private constructor (CIF: string) {
    this.CIF = CIF;
  }

  public static create(CIF: string): Cif {
    const CIF_PATTERN = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;

    if(!CIF) {
      throw new MandatoryFieldException("CIF");
    }
    if(!CIF_PATTERN.test(CIF)) {
      throw new CifFormatException();
    }
    return new Cif(CIF);
  }

  public getCif(): string {
    return this.CIF;
  }
}
