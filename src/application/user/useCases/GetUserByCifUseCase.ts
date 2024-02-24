import type { UserRepository } from '../../../domain/user/UserRepository.ts';

export class GetUserByCifUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  execute = async (cif: string): Promise<string | null> => {
    const userId = await this.userRepository.getUserIdByCif(cif);

    if (userId === null) return null;

    return userId;
  };
}
