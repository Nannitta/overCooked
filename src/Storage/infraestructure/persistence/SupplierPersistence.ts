import type { UUID } from "node:crypto";
import { getPool } from "../../../shared/infraestructure/db/connectDB.ts";
import type { Supplier } from "../../domain/entities/Supplier.ts";
import type { SupplierRespository } from "../../domain/repositories/SupplierRepository.ts";
import { generateUUID } from "../../../shared/infraestructure/utils/generateUUID.ts";
import type { Cif } from "../../../shared/domain/valueObjects/Cif.ts";

export class SupplierPersistence implements SupplierRespository {
  async postSupplier (supplier: Supplier): Promise<void> {
    const pool = getPool();

    const supplierId: UUID = generateUUID();

    await pool.query(
      `INSERT INTO suppliers (supplierId, supplierName, CIF, email, phone, createdAt)
        VALUES(?, ?, ?, ?, ?, ?)`,
      [supplierId, supplier.supplierName, supplier.CIF, supplier.email, supplier.phone, new Date()]
    );
  }

  async getSupplierByCif (CIF: Cif): Promise<Supplier | null> {
    const pool = getPool();

    const [result] = await pool.query(
      "SELECT supplierId FROM suppliers WHERE CIF = ?",
      [CIF.CIF]
    );

    if(result[0] === undefined) {
      return null;
    }

    const supplier = result[0];

    return supplier;
  }
}
