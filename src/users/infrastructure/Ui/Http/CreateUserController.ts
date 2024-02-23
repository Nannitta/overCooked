/* import type { NextFunction, Request, Response } from 'express';
import { getPool } from '../../../../../db/connectDB.ts';
import { throwError } from '../../../../utils/errorHelper.ts';
import crypto from 'node:crypto';
import type { UUID } from 'crypto';
import bcrypt from 'bcrypt';
import type { User } from '../../../domain/User.ts';

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      companyName,
      CIF,
      email,
      password,
      phone,
      address,
      city,
      country,
      province,
      postalCode
    }: User = req.body;

    const pool = getPool();

    function isNonEmptyString (value: string): boolean {
      return typeof value === 'string' && value.trim() !== '';
    }

    if (!isNonEmptyString(companyName) || !isNonEmptyString(CIF) || !isNonEmptyString(email) || !isNonEmptyString(password) || !isNonEmptyString(phone) || !isNonEmptyString(address) || !isNonEmptyString(city) || !isNonEmptyString(country) || !isNonEmptyString(province) || !isNonEmptyString(postalCode)) {
      next(throwError('Los campos obligatorios no pueden estar vacíos', 400));
    }

    const [userEmail] = await pool.query(
      'SELECT email from users WHERE email = ?',
      [email]
    );

    const [userCif] = await pool.query(
      'SELECT cif from users WHERE cif = ?',
      [CIF]
    );

    if (Array.isArray(userEmail) && userEmail.length > 0) {
      next(throwError('El email ya esta en uso', 400));
    }
    if (Array.isArray(userCif) && userCif.length > 0) {
      next(throwError('El CIF ya esta en uso', 400));
    }

    const userId: UUID = crypto.randomUUID();

    const activationCode: UUID = crypto.randomUUID();

    const hashedPassword: string = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (userId, companyName, CIF, email, password, phone, address, city, country, province, postalCode, activationCode, createdAt)
      values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        companyName,
        CIF,
        email,
        hashedPassword,
        phone,
        address,
        city,
        country,
        province,
        postalCode,
        activationCode,
        new Date()
      ]
    );

    res.status(200).send({
      status: 'Ok',
      message: 'Usuario creado correctamente'
    });
  } catch (error) {
    next(error);
  }
}; */

import { throwError } from '../../../../utils/errorHelper.ts';
import { User } from '../../../domain/User.ts';
import type { UserRepository } from '../../../domain/UserRepository.ts';

export class registerUserUserRepository implements UserRepository {
  async postUser (user: User): Promise <User | null> {
    const userId = user.userId;
    const companyName = user.companyName;
    const address = user.address;
    const CIF = user.CIF;
    const password = user.password;
    const email = user.email;
    const phone = user.phone;
    const city = user.city;
    const country = user.country;
    const province = user.province;
    const postalCode = user.postalCode;

    if (CIF !== '') {
      throwError('El CIF ya esta en uso', 400);
    }

    return new User(userId, companyName, address, CIF, password, email, phone, city, country, province, postalCode);
  }
};
