import { CreateSupplierUseCase } from "../application/useCases/CreateSupplierUseCase.ts";
import { PostSupplierController } from "./controllers/postSupplierController.ts";
import { SupplierPersistence } from "./persistence/SupplierPersistence.ts";

const supplierPersistence = new SupplierPersistence();

export const addNewSupplier = new CreateSupplierUseCase(supplierPersistence);
export const postSupplierController = new PostSupplierController(addNewSupplier);
