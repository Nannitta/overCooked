import type { User } from "../../domain/entities/User.ts";
import type { UserRepository } from "../../domain/repositories/UserRepository.ts";
import bcrypt from "bcrypt";
import { generateUUID } from "../../../shared/infraestructure/utils/generateUUID.ts";
import type { Cif } from "../../../shared/domain/valueObjects/Cif.ts";
import type { UUID } from "node:crypto";
import Users from "../../../shared/infraestructure/db/models/Users.ts";

export class UserPersistence implements UserRepository {
  async postUser (user: User): Promise<void> {
    const userId: UUID = generateUUID();
    const activationCode: UUID = generateUUID();

    const hashedPassword: string = await bcrypt.hash(user.password, 10);

    await Users.create(
      {
        userId,
        companyName: user.companyName,
        CIF: user.CIF,
        email: user.email,
        password: hashedPassword,
        activationCode
      }
    );
  }

  async getUserByCif (cif: Cif): Promise<User | null> {
    const user: Users | null = await Users.findOne({
      where: { cif: cif.CIF }
    });

    if(!user) {
      return null;
    }

    return user.dataValues;
  }
}
