import type { User } from '../../../domain/user/User.ts';
import type { UserRepository } from '../../../domain/user/UserRepository.ts';
import { throwError, type CustomError } from '../../../infrastructure/utils/errorHelper.ts';
import { generateUUID } from '../../../infrastructure/utils/generateUUID.ts';

export class CreateUserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  execute = async (user: User): Promise<void> => {
    const id = generateUUID();
    const activationCode = generateUUID();

    const userIdByCif: string | null = await this.userRepository.getUserIdByCif(user.CIF);
    let userId: string | null = await this.userRepository.getUserById(id);

    if (userIdByCif !== null) {
      const error: CustomError = throwError('El CIF indicado ya esta en uso', 403);
      throw error;
    }

    if (userId !== null) {
      userId = generateUUID();
    }

    await this.userRepository.postUser(user, id, activationCode);
  };
}
