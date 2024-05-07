import type { LoginUser } from "../../../../../src/Users/domain/entities/LoginUser.ts";
import type { User } from "../../../../../src/Users/domain/entities/User.ts";
import type { LoginUserRepository } from "../../../../../src/Users/domain/repositories/LoginUserRepository.ts";
import jwt from "jsonwebtoken";
import type { Email } from "../../../../../src/shared/domain/valueObjects/Email.ts";

export class LoginUserRepositoryInMemory implements LoginUserRepository {
  private readonly users: User[] = [];

  checkUserExists = async (loginUser: LoginUser): Promise<User | null> => {
    return await new Promise((resolve) => {
      const user: User | undefined = this.users.find((user) => {
        return user.email === loginUser.email;
      });

      if(user) resolve(user);
      resolve(null);
    });
  };

  getUserToken = (user: User): string => {
    const { SECRET } = process.env;

    const payload = {
      id: user.userId,
      role: user.role
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: "1w" });

    return token;
  };

  getActivatedUser = async (email: Email): Promise<User | null> => {
    return await new Promise((resolve) => {
      const userActivated: User | undefined = this.users.find((user) => {
        return user.email === email.getEmail() && user.activationCode;
      });

      if(userActivated) resolve(userActivated);
      resolve(null);
    });
  };

  public readonly postLoginUserInMemory = (user: User): void => {
    this.users.push(user);
  };
};
