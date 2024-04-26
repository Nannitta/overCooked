import type { UUID } from "node:crypto";
import type { CompanyName } from "../../../shared/domain/valueObjects/CompanyName.ts";
import type { Cif } from "../../../shared/domain/valueObjects/Cif.ts";
import type { Phone } from "../../../shared/domain/valueObjects/Phone.ts";
import type { EmailSupplier } from "../valueObjects/EmailSupplier.ts";

export class Supplier {
  private constructor(
    public readonly supplierName: string,
    public readonly CIF: string,
    public readonly phone: string,
    public readonly email?: string,
    public readonly createdAt?: Date,
    public readonly modifiedAt?: Date,
    public readonly supplierId?: UUID
  ) {}

  public static create(
    supplierName: CompanyName,
    CIF: Cif,
    phone: Phone,
    email: EmailSupplier | null,
    createdAt?: Date,
    modifiedAt?: Date,
    supplierId?: UUID
  ): Supplier {
    return new Supplier(
      supplierName.getCompanyName(),
      CIF.getCif(),
      phone.getPhone(),
      email?.getSupplierEmail(),
      createdAt,
      modifiedAt,
      supplierId
    );
  }
}
