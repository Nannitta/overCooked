import type { Router } from "express";
import express from "express";
import { postSupplierController } from "../../../Storage/infraestructure/dependencies.ts";

const storageRouter: Router = express.Router();

storageRouter.post("/addSupplier", postSupplierController.execute.bind(postSupplierController));

export { storageRouter };
