import type { Supplier } from "../../../../../src/Storage/domain/entities/Supplier.ts";
import type { SupplierRespository } from "../../../../../src/Storage/domain/repositories/SupplierRepository.ts";
import type { Cif } from "../../../../../src/shared/domain/valueObjects/Cif.ts";

export class SupplierRespositoryInMemory implements SupplierRespository {
  private readonly suppliers: Supplier[] = [];

  postSupplier = async (supplier: Supplier): Promise<void> => {
    await new Promise((resolve) => {
      this.addSupplierInMemory(supplier);
      resolve(supplier);
    });
  };

  getSupplierByCif = async (cif: Cif): Promise<Supplier | null> => {
    return await new Promise((resolve) => {
      const supplier: Supplier | undefined = this.suppliers.find((supplier) => {
        return supplier.cif === cif.getCif();
      });

      if(supplier) resolve(supplier);
      resolve(null);
    });
  };

  private readonly addSupplierInMemory = (supplier: Supplier): void => {
    this.suppliers.push(supplier);
  };
};
