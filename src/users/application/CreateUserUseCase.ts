import type { User } from '../domain/User.ts';
import type { UserRepository } from '../domain/UserRepository.ts';

export class CreateUserUseCase {
constructor(
  private userRepository: UserRepository
  ) {}

  public execute(user: User): Promise<void> {
    return this.userRepository.postUser(user);
  }
}