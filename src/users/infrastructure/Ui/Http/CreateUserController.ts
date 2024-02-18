import type { NextFunction, Request, Response } from "express";
import { getPool } from "../../../../../db/connectDB.ts";
import { throwError } from "../../../../helpers/errorHelper.ts";
import crypto from "node:crypto";
import type { UUID } from "crypto";
import bcrypt from "bcrypt";

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      postalCode,
    } = req.body;

    const pool = await getPool();

    if (!companyName && !CIF && !email && !password && !phone && !address && !city && !country && !province && !postalCode) {
      return next(throwError("Los campos obligatorios no pueden estar vacíos", 400));
    }
    
    const [userEmail] = await pool.query(
      "SELECT email from users WHERE email = ?",
      [email]
    );
    
    const [userCif] = await pool.query(
      "SELECT cif from users WHERE cif = ?", 
      [CIF]
    );

    if (Array.isArray(userEmail) && userEmail.length > 0) {
      return next(throwError("El email ya esta en uso", 400));
    }
    if (Array.isArray(userCif) && userCif.length > 0) {
      return next(throwError("El CIF ya esta en uso", 400));
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
        new Date(),
      ]
    );

    res.status(200).send({
      status: "Ok",
      message: "Usuario creado correctamente",
    });
  } catch (error) {
    next(error);
  }
};
