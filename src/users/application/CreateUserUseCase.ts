import type { User } from '../domain/User';
import type { UserRepository } from '../domain/UserRepository';
import crypto from 'node:crypto';

export class CreateUserUseCase {
constructor(
  private userRepository: UserRepository
  ) {}

  public execute(user: User): Promise<void> {
    const userId = crypto.randomUUID();
    user.userId = userId;
    return this.userRepository.postUser(user)
  }
}