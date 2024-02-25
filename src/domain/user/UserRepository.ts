import type { User } from './User.ts';

export interface UserRepository {
  postUser: (user: User) => Promise<void>
  getUserIdByCif: (cif: string) => Promise<string | null>
}
