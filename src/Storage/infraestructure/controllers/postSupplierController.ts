import type { Request, Response, NextFunction } from "express";
import type { Controller } from "../../../shared/infraestructure/controllers/Controller.ts";
import type { CreateSupplierUseCase } from "../../application/useCases/CreateSupplierUseCase.ts";

export class PostSupplierController implements Controller {
  constructor(private readonly createSupplierUseCase: CreateSupplierUseCase) {}

  execute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.createSupplierUseCase.execute(
        req.body.supplierName as string,
        req.body.CIF as string,
        req.body.phone as string,
        req.body.email as string
      );

      res.status(200).send({
        status: "Ok",
        message: "Proveedor añadido correctamente"
      });
    } catch (error) {
      next(error);
    }
  };
}
