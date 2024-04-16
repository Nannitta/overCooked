import { app, closeServer } from "../../../server.ts";
import { SupplierPersistence } from "../../../src/Storage/infraestructure/persistence/SupplierPersistence.ts";
import { SupplierMother } from "../../unit/Storage/domain/mothers/supplierMother.ts";
import request from "supertest";

jest.mock("../../../src/Storage/infraestructure/persistence/SupplierPersistence.ts");

const mockedSupplierPersistence = SupplierPersistence as jest.MockedClass<typeof SupplierPersistence>;

afterAll(() => {
  closeServer();
  jest.clearAllMocks();
});

describe("Acceptance test for post supplier", () => {
  it("As user I want to add a supplier in the application", async () => {
    const supplier = new SupplierMother().random();
    const mockedPostSupplier = mockedSupplierPersistence.prototype.postSupplier.mockResolvedValue();

    const response = await request(app)
      .post("/user/addSupplier")
      .send(supplier)
      .set("Accept", "application/json")
      .expect(200);
    expect(response.body).toEqual({
      status: "Ok",
      message: "Proveedor añadido correctamente"
    });

    expect(mockedPostSupplier).toHaveBeenCalledWith(supplier);
  });
});
