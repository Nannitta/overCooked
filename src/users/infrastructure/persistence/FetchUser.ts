import type { UserRepository } from '../../domain/UserRepository.ts';
import type { User } from '../../domain/User.ts';

export class FetchUser implements UserRepository {
/*   async postUser (user: User) {
    try {
      await fetch('http://localhost:4000/user/register', {
        method: 'POST',
        body: JSON.stringify(user)
      });
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  } */
  constructor (readonly UserRepository: UserRepository) {}
  postUser!: (user: User) => Promise<User | null>;
};
