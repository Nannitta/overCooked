import type { User } from '../../../domain/user/User.ts';
import type { UserRepository } from '../../../domain/user/UserRepository.ts';
import { generateUUID } from '../../../infrastructure/utils/generateUUID.ts';

export class CreateUserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  execute = async (user: User): Promise<void> => {
    const id = generateUUID();
    const activationCode = generateUUID();

    const userId = await this.userRepository.getUserIdByCif(user.CIF);
    if (userId === null) {
      return;
    }
    await this.userRepository.postUser(user, id, activationCode);
  };
}
