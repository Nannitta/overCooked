import type { User } from './User.ts';

export interface UserRepository {
  postUser: (user: User, userId: string, activationCode: string) => Promise<void>
  getUserIdByCif: (cif: string) => Promise<string | null>
}
