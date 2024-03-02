import type { User } from '../entities/Users.ts';

export interface UserRepository {
  postUser: (user: User) => Promise<void>
  getUserIdByCif: (cif: string) => Promise<string | null>
}
