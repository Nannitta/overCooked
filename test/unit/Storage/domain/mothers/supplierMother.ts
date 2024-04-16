import { Supplier } from "../../../../../src/Storage/domain/entities/Supplier.ts";
import { Cif } from "../../../../../src/shared/domain/valueObjects/Cif.ts";
import { CompanyName } from "../../../../../src/shared/domain/valueObjects/CompanyName.ts";
import { Email } from "../../../../../src/shared/domain/valueObjects/Email.ts";
import { Phone } from "../../../../../src/shared/domain/valueObjects/Phone.ts";

export class SupplierMother {
  public random = (): Supplier => {
    const supplier = Supplier.create(
      CompanyName.create("Ejemplo"),
      Email.create("ejemplo@gmail.com"),
      Cif.create("B1234567B"),
      Phone.create("+34-658954236")
    );
    return supplier;
  };
}
