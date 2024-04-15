import type { User } from "../../../../../src/Users/domain/entities/User.ts";
import type { UserRepository } from "../../../../../src/Users/domain/repositories/UserRepository.ts";
import type { Cif } from "../../../../../src/shared/domain/valueObjects/Cif.ts";

export class UserRepositoryInMemory implements UserRepository {
  private readonly users: User[] = [];

  postUser = async (user: User): Promise<void> => {
    await new Promise((resolve) => {
      this.addUserInMemory(user);
      resolve(user);
    });
  };

  getUserByCif = async (CIF: Cif): Promise<User | null> => {
    return await new Promise((resolve) => {
      const user: User | undefined = this.users.find((user) => {
        return user.CIF === CIF.getCif();
      });

      if(user) resolve(user);
      resolve(null);
    });
  };

  private readonly addUserInMemory = (user: User): void => {
    this.users.push(user);
  };
};
