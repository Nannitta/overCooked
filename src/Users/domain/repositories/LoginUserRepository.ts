import type { Email } from "../../../shared/domain/valueObjects/Email.ts";
import type { LoginUser } from "../entities/LoginUser.ts";
import type { User } from "../entities/User.ts";

export interface LoginUserRepository {
  checkUserExists: (loginUser: LoginUser) => Promise<User | null>
  getUserToken: (user: User) => string
  getActivatedUser: (email: Email) => Promise<User | null>
}
