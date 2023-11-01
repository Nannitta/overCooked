import type { User } from './User'; 

export interface UserRepository {
  postUser(
    user: User
  ): Promise<void>
}