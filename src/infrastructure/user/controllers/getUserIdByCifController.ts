import type { GetUserByCifUseCase } from '../../../application/user/useCases/GetUserByCifUseCase.ts';
import type { NextFunction, Request, Response } from 'express';
import { throwError, type CustomError } from '../../utils/errorHelper.ts';

export class GetUserIdByCifrController {
  constructor (private readonly getUserByCifUseCase: GetUserByCifUseCase) {}

  execute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userIdByCif = await this.getUserByCifUseCase.execute(req.body.CIF as string);
      if (userIdByCif !== null) {
        const error: CustomError = throwError('El CIF indicado ya esta en uso', 403);
        throw error;
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
