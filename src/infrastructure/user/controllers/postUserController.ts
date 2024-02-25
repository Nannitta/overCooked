import type { CreateUserUseCase } from '../../../application/user/useCases/CreateUserUseCase.ts';
import type { User } from '../../../domain/user/User.ts';
import type { NextFunction, Request, Response } from 'express';
import { registerUserSchema } from '../schemas/registerUserSchema.ts';
import { throwError, type CustomError } from '../../utils/errorHelper.ts';

export class PostUserController {
  constructor (private readonly createUserUseCase: CreateUserUseCase) {}

  execute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user: User = {
      companyName: req.body.companyName,
      CIF: req.body.CIF,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      province: req.body.province,
      postalCode: req.body.postalCode,
      web: req.body.web ?? ''
    };

    const { error: errorSchema } = registerUserSchema.validate(user);

    if (errorSchema !== undefined) {
      const error: CustomError = throwError(errorSchema.message, 400);
      throw error;
    }

    try {
      await this.createUserUseCase.execute(user);
      res.status(200).send({
        status: 'Ok',
        message: 'Usuario creado correctamente'
      });
    } catch (error) {
      next(error);
    }
  };
}
