import { getPool } from "../../../shared/infraestructure/db/connectDB.ts";
import type { User } from "../../domain/entities/User.ts";
import type { UserRepository } from "../../domain/repositories/UserRepository.ts";
import bcrypt from "bcrypt";
import { generateUUID } from "../../../shared/infraestructure/utils/generateUUID.ts";
import type { Cif } from "../../domain/valueObjects/Cif.ts";

export class UserPersistence implements UserRepository {
  async postUser (user: User): Promise<void> {
    const pool = getPool();

    const userId: string = generateUUID();
    const activationCode: string = generateUUID();

    const hashedPassword: string = await bcrypt.hash(user.password, 10);

    await pool.query(
      `INSERT INTO users (userId, companyName, CIF, email, password, phone, address, city, country, province, postalCode, web, activationCode, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        user.companyName,
        user.cif,
        user.email,
        hashedPassword,
        user.phone,
        user.address,
        user.city,
        user.country,
        user.province,
        user.postalCode,
        user.web,
        activationCode,
        new Date()
      ]
    );
  }

  async getUserIdByCif (cif: Cif): Promise<string | null> {
    const pool = getPool();

    const [result] = await pool.query(
      "SELECT userId FROM users WHERE CIF = ?",
      [cif.cif]
    );

    if (result[0] === undefined) {
      return null;
    }

    const userIdByCif = result[0]?.userId;

    return userIdByCif;
  }
}
