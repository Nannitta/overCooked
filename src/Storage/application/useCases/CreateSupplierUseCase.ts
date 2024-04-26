import type { UUID } from "node:crypto";
import type { SupplierRespository } from "../../domain/repositories/SupplierRepository.ts";
import { CompanyName } from "../../../shared/domain/valueObjects/CompanyName.ts";
import { Cif } from "../../../shared/domain/valueObjects/Cif.ts";
import { Phone } from "../../../shared/domain/valueObjects/Phone.ts";
import { CifAlreadyExistsException } from "../../../shared/domain/exceptions/CifAlreadyExistsException.ts";
import { Supplier } from "../../domain/entities/Supplier.ts";
import { EmailSupplier } from "../../domain/valueObjects/EmailSupplier.ts";

export class CreateSupplierUseCase {
  constructor(private readonly supplierRepository: SupplierRespository) {}

  execute = async (
    supplierName: string,
    CIF: string,
    phone: string,
    email?: string,
    createdAt?: Date,
    modifiedAt?: Date,
    supplierId?: UUID
  ): Promise<void> => {
    const supplierNamePersistence = CompanyName.create(supplierName);
    const cifPersistence = Cif.create(CIF);
    const phonePersistence = Phone.create(phone);
    const emailPersistence = EmailSupplier.create(email);

    const checkSupplier = await this.supplierRepository.getSupplierByCif(cifPersistence);

    if(checkSupplier) throw new CifAlreadyExistsException();

    const supplier = Supplier.create(
      supplierNamePersistence,
      cifPersistence,
      phonePersistence,
      emailPersistence,
      createdAt,
      modifiedAt,
      supplierId
    );

    await this.supplierRepository.postSupplier(supplier);
  };
}
