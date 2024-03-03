import type { User } from "../entities/User.ts";
import type { Cif } from "../valueObjects/Cif.ts";

export interface UserRepository {
  postUser: (user: User) => Promise<void>
  getUserIdByCif: (cif: Cif) => Promise<string | null>
}
