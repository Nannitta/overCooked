import type { UUID } from "node:crypto";
import type { SupplierRespository } from "../../domain/repositories/SupplierRepository.ts";
import { CompanyName } from "../../../shared/domain/valueObjects/CompanyName.ts";
import { Email } from "../../../shared/domain/valueObjects/Email.ts";
import { Cif } from "../../../shared/domain/valueObjects/Cif.ts";
import { Phone } from "../../../shared/domain/valueObjects/Phone.ts";
import { CifAlreadyExistsException } from "../../../shared/domain/exceptions/CifAlreadyExistsException.ts";
import { Supplier } from "../../domain/entities/Supplier.ts";

export class CreateSupplierUseCase {
  constructor(private readonly supplierRepository: SupplierRespository) {}

  execute = async (
    supplierName: string,
    cif: string,
    email: string,
    phone: string,
    createdAt?: Date,
    modifiedAt?: Date,
    supplierId?: UUID
  ): Promise<void> => {
    const supplierNamePersistence = CompanyName.create(supplierName);
    const cifPersistence = Cif.create(cif);
    const emailPersistence = Email.create(email);
    const phonePersistence = Phone.create(phone);

    const checkSupplier = await this.supplierRepository.getSupplierByCif(cifPersistence);

    if(checkSupplier) throw new CifAlreadyExistsException();

    const supplier = Supplier.create(
      supplierNamePersistence,
      cifPersistence,
      emailPersistence,
      phonePersistence,
      createdAt,
      modifiedAt,
      supplierId
    );

    await this.supplierRepository.postSupplier(supplier);
  };
}
