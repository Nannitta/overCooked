import type { User } from "../entities/User.ts";
import type { Cif } from "../../../shared/domain/valueObjects/Cif.ts";
/* import type{ UUID } from "node:crypto"; */

export interface UserRepository {
  postUser: (user: User) => Promise<void>
  getUserByCif: (cif: Cif) => Promise<User | null>
/*   getActivatedUser: (userId: UUID) => Promise<UUID | null> */
}
