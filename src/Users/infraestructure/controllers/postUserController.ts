import type { CreateUserUseCase } from "../../application/useCases/CreateUserUseCase.ts";
import type { User } from "../../domain/entities/User.ts";
import type { NextFunction, Request, Response } from "express";
import {
  throwError,
  type CustomError,
} from "../../../shared/infraestructure/utils/errorHelper.ts";

export class PostUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  execute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.createUserUseCase.execute(
        req.body.companyName,
        req.body.CIF,
        req.body.email,
        req.body.password,
        req.body.phone,
        req.body.address,
        req.body.city,
        req.body.country,
        req.body.province,
        req.body.postalCode,
        req.body.web ?? ""
      );
      res.status(200).send({
        status: "Ok",
        message: "Usuario creado correctamente",
      });
    } catch (error) {
      next(error);
    }
  };
}
