import { Supplier } from "../../../../../src/Storage/domain/entities/Supplier.ts";
import { EmailSupplier } from "../../../../../src/Storage/domain/valueObjects/EmailSupplier.ts";
import { Cif } from "../../../../../src/shared/domain/valueObjects/Cif.ts";
import { CompanyName } from "../../../../../src/shared/domain/valueObjects/CompanyName.ts";
import { Phone } from "../../../../../src/shared/domain/valueObjects/Phone.ts";

export class SupplierMother {
  public random = (): Supplier => {
    const supplier = Supplier.create(
      CompanyName.create("Ejemplo"),
      Cif.create("B1234567B"),
      Phone.create("+34-658954236"),
      EmailSupplier.create("ejemplo@gmail.com")
    );
    return supplier;
  };
}
