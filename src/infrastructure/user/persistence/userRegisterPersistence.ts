import { getPool } from '../../../../db/connectDB.ts';
import type { User } from '../../../domain/user/User.ts';
import type { UserRepository } from '../../../domain/user/UserRepository.ts';
import bcrypt from 'bcrypt';

export class UserRegisterPersistence implements UserRepository {
  async postUser (user: User, userId: string, activationCode: string): Promise<void> {
    const pool = getPool();

    const hashedPassword: string = await bcrypt.hash(user.password, 10);

    await pool.query(
      `INSERT INTO users (userId, companyName, CIF, email, password, phone, address, city, country, province, postalCode, web, activationCode, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, user.companyName, user.CIF, user.email, hashedPassword, user.phone, user.address, user.city, user.country, user.province, user.postalCode, user.web, activationCode, new Date()]
    );
  }

  async getUserIdByCif (cif: string): Promise <string | null> {
    const pool = getPool();

    const [result] = await pool.query(
      'SELECT userId FROM users WHERE CIF = ?', [cif]
    );

    if (result[0] === undefined) {
      return null;
    }

    const userIdByCif: string = result[0]?.userId;

    return userIdByCif;
  }

  async getUserById (id: string): Promise <string | null> {
    const pool = getPool();

    const [result] = await pool.query(
      'SELECT userId FROM users WHERE userId = ?', [id]
    );

    if (result[0] === undefined) {
      return null;
    }

    const userId: string = result[0]?.userId;

    return userId;
  }
}
