import { CreateSupplierUseCase } from "../../../../src/Storage/application/useCases/CreateSupplierUseCase.ts";
import type { Supplier } from "../../../../src/Storage/domain/entities/Supplier.ts";
import { CifAlreadyExistsException } from "../../../../src/shared/domain/exceptions/CifAlreadyExistsException.ts";
import { Cif } from "../../../../src/shared/domain/valueObjects/Cif.ts";
import { SupplierMother } from "../domain/mothers/supplierMother.ts";
import { SupplierRespositoryInMemory } from "../infraestructure/persistence/SupplierRepositoryInMemory.ts";

describe("Unit test to create supplier useCase", () => {
  let createSupplierUseCase: CreateSupplierUseCase;
  let supplierRespositoryInMemory: SupplierRespositoryInMemory;

  beforeEach(() => {
    supplierRespositoryInMemory = new SupplierRespositoryInMemory();
    createSupplierUseCase = new CreateSupplierUseCase(supplierRespositoryInMemory);
  });

  it("Should throw an error when given a supplier's cif already exists", async () => {
    try {
      const supplier = new SupplierMother().random();

      await supplierRespositoryInMemory.postSupplier(supplier);

      await createSupplierUseCase.execute(supplier.supplierName, supplier.email, supplier.cif, supplier.phone);
    } catch (error) {
      expect(error).toBeInstanceOf(CifAlreadyExistsException);
    }
  });

  it("Should create a supplier", async () => {
    const supplierRandom = new SupplierMother().random();

    await createSupplierUseCase.execute(supplierRandom.supplierName, supplierRandom.email, supplierRandom.cif, supplierRandom.phone);

    const supplier: Supplier | null = await supplierRespositoryInMemory.getSupplierByCif(Cif.create(supplierRandom.cif));

    expect(supplier?.cif).toEqual(supplierRandom.cif);
  });
});
