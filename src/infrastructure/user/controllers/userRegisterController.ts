import type { CreateUserUseCase } from '../../../application/user/useCases/CreateUserUseCase.ts';
import type { User } from '../../../domain/user/User.ts';
import type { Request, Response } from 'express';

export class UserRegisterController {
  constructor (private readonly createUserUseCase: CreateUserUseCase) {}

  async execute (req: Request, res: Response): Promise<void> {
    const user: User = {
      userId: req.body.userId,
      companyName: req.body.companyName,
      CIF: req.body.CIF,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      address: req.body.addres,
      city: req.body.city,
      country: req.body.country,
      province: req.body.province,
      postalCode: req.body.postalCode,
      web: req.body.web ?? '',
      createdAt: new Date()
    };

    await this.createUserUseCase.execute(user);

    res.status(200).send();
  };
}
