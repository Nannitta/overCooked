import type { User } from '../../../domain/user/User.ts';
import type { UserRepository } from '../../../domain/user/UserRepository.ts';

export class CreateUserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  execute = async (user: User): Promise<void> => {
    await this.userRepository.postUser(user);
  };
}
