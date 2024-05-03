import type { User } from "../entities/User.ts";
import type { Cif } from "../../../shared/domain/valueObjects/Cif.ts";

export interface UserRepository {
  postUser: (user: User) => Promise<void>
  getUserByCif: (cif: Cif) => Promise<User | null>
}
