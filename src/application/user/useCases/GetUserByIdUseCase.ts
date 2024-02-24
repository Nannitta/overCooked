import type { UserRepository } from '../../../domain/user/UserRepository.ts';

export class GetUserByIdUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  execute = async (id: string): Promise<string | null> => {
    const userId: string | null = await this.userRepository.getUserById(id);

    if (userId === null) return null;

    return userId;
  };
}
