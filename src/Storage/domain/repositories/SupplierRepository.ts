import type { Cif } from "../../../shared/domain/valueObjects/Cif.ts";
import type { Supplier } from "../entities/Supplier.ts";

export interface SupplierRespository {
  postSupplier: (supplier: Supplier) => Promise<void>
  getSupplierByCif: (CIF: Cif) => Promise<Supplier | null>
}
