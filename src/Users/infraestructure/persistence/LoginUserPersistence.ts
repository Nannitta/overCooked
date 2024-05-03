import Users from "../../../shared/infraestructure/db/models/Users.ts";
import type { LoginUser } from "../../domain/entities/LoginUser.ts";
import type { LoginUserRepository } from "../../domain/repositories/LoginUserRepository.ts";
import bcrypt from "bcrypt";
import type { Email } from "../../../shared/domain/valueObjects/Email.ts";
import type { User } from "../../domain/entities/User.ts";
import jwt from "jsonwebtoken";

export class LoginUserPersistence implements LoginUserRepository {
  async checkUserExists (loginUser: LoginUser): Promise<User | null> {
    const user: Users | null = await Users.findOne({
      where: { email: loginUser.email }
    });

    if(!user) return null;

    const checkPassword: boolean = await bcrypt.compare(loginUser.password, user.dataValues.password as string);

    if(!checkPassword) return null;

    return user.dataValues;
  }

  getUserToken (user: User): string {
    const { SECRET } = process.env;

    const payload = {
      id: user.userId,
      role: user.role
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: "1w" });

    return token;
  }

  async getActivatedUser (email: Email): Promise <Users | null> {
    const user: Users | null = await Users.findOne({
      where: { email: email.email }
    });

    if(!user || user.dataValues.activationCode) {
      return null;
    }

    return user.dataValues;
  }
}
