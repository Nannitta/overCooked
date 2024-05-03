import type { NextFunction, Request, Response } from "express";
import type { Controller } from "../../../shared/infraestructure/controllers/Controller.ts";
import type { LoginUserUseCase } from "../../application/useCases/LoginUserUseCase.ts";

export class LoginUserController implements Controller {
  constructor(private readonly loginUserUserCase: LoginUserUseCase) {}

  execute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const token: string = await this.loginUserUserCase.execute(
        req.body.email as string,
        req.body.password as string
      );

      res.status(200).send({
        status: "Ok",
        message: "Usuario logueado correctamente",
        token
      });
    } catch (error) {
      next(error);
    }
  };
}
