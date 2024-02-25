import type { UserRepository } from '../../../domain/user/UserRepository.ts';

export class GetUserByCifUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  execute = async (cif: string): Promise<string | null> => {
    const userIdByCif: string | null = await this.userRepository.getUserIdByCif(cif);

    return userIdByCif;
  };
}
