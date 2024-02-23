/* import type { User } from '../domain/User.ts';
import type { UserRepository } from '../domain/UserRepository.ts';

export class CreateUserUseCase {
  constructor (
    readonly userRepository: UserRepository
  ) {}

  public async execute (user: User): Promise<void> {
    await this.userRepository.postUser(user);
  }
} */

import type { User } from '../domain/User.ts';
import type { UserRepository } from '../domain/UserRepository.ts';

export class createUserUseCase {
  constructor (private readonly UserRepository: UserRepository) {}

  public registerUser = async (user: User): Promise<void> => {
    await this.UserRepository.postUser(user);
  };
}
