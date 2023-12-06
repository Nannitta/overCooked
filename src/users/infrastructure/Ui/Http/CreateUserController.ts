import type { NextFunction, Request, Response } from "express";
import { getPool } from "../../../../../db/connectDB";
import { throwError } from "../../../../helpers/errorHelper";
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
      userId,
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

    const [userEmail] = await pool.query(
      "SELECT email from users WHERE email = ?",
      [email]
    );
    const [userCif] = await pool.query("SELECT cif from users WHERE cif = ?", [
      CIF,
    ]);

    if (userEmail) {
      return next(throwError("El email ya esta en uso", 400));
    }
    if (userCif) {
      return next(throwError("El CIF ya esta en uso", 400));
    }

    const activationCode: UUID = crypto.randomUUID();

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (userId, companyName, CIF, email, password, phone, address, city, country, province, postalCode, activationCode, createdAt)
      values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
