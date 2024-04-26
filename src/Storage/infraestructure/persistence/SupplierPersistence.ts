import type { UUID } from "node:crypto";
import type { Supplier } from "../../domain/entities/Supplier.ts";
import type { SupplierRespository } from "../../domain/repositories/SupplierRepository.ts";
import { generateUUID } from "../../../shared/infraestructure/utils/generateUUID.ts";
import type { Cif } from "../../../shared/domain/valueObjects/Cif.ts";
import Suppliers from "../../../shared/infraestructure/db/models/Suppliers.ts";

export class SupplierPersistence implements SupplierRespository {
  async postSupplier (supplier: Supplier): Promise<void> {
    const supplierId: UUID = generateUUID();

    await Suppliers.create({
      supplierId,
      supplierName: supplier.supplierName,
      CIF: supplier.CIF,
      phone: supplier.phone,
      email: supplier.email
    });
  }

  async getSupplierByCif (CIF: Cif): Promise<Supplier | null> {
    const supplierData = await Suppliers.findOne({
      where: { CIF: CIF.CIF }
    });

    if(supplierData?.dataValues) {
      return null;
    }

    return supplierData?.dataValues;
  }
}
