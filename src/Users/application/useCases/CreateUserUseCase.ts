import type { User } from '../../domain/entities/User.ts';
import type { UserRepository } from '../../domain/repositories/UserRepository.ts';

export class CreateUserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  execute = async (user: User): Promise<void> => {
    await this.userRepository.postUser(user);
  };
}
