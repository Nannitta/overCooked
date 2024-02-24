import type { User } from '../../../domain/user/User.ts';

export class CreateUserUseCase {
  async execute (user: User): Promise<void> {
    console.log(user);
  };
}
