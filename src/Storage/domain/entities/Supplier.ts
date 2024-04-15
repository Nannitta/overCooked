import type { UUID } from "node:crypto";
import type { CompanyName } from "../../../shared/domain/valueObjects/CompanyName.ts";
import type { Cif } from "../../../shared/domain/valueObjects/Cif.ts";
import type { Email } from "../../../shared/domain/valueObjects/Email.ts";
import type { Phone } from "../../../shared/domain/valueObjects/Phone.ts";

export class Supplier {
  private constructor(
    public readonly supplierName: string,
    public readonly email: string,
    public readonly cif: string,
    public readonly phone: string,
    public readonly createdAt?: Date,
    public readonly modifiedAt?: Date,
    public readonly supplierId?: UUID
  ) {}

  public static create(
    supplierName: CompanyName,
    email: Email,
    cif: Cif,
    phone: Phone,
    createdAt?: Date,
    modifiedAt?: Date,
    supplierId?: UUID
  ): Supplier {
    return new Supplier(
      supplierName.getCompanyName(),
      email.getEmail(),
      cif.getCif(),
      phone.getPhone(),
      createdAt,
      modifiedAt,
      supplierId
    );
  }
}
