/* import type { User } from './User.ts';

export interface UserRepository {
  postUser: (
    user: User
  ) => Promise<void>
}
 */

import type { User } from './User.ts';

export interface UserRepository {
  postUser: (user: User) => Promise<User | null>
}
