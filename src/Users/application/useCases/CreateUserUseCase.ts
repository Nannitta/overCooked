import { User } from "../../domain/entities/User.ts";
import { CifAlreadyExistsException } from "../../domain/exceptions/CifAlreadyExistsException.ts";
import type { UserRepository } from "../../domain/repositories/UserRepository.ts";
import { Cif } from "../../domain/valueObjects/Cif.ts";
import { CompanyName } from "../../domain/valueObjects/CompanyName.ts";
import { Email } from "../../domain/valueObjects/Email.ts";
import { Password } from "../../domain/valueObjects/Password.ts";
import { Role } from "../../domain/valueObjects/Role.ts";
import type { UUID } from "node:crypto";

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute = async (
    companyName: string,
    CIF: string,
    email: string,
    password: string,
    role: string,
    createdAt?: Date,
    modifiedAt?: Date,
    userId?: UUID
  ): Promise<void> => {
    const companyNamePersistence = CompanyName.create(companyName);
    const cifPersistence = Cif.create(CIF);
    const emailPersistence = Email.create(email);
    const passwordPersistence = Password.create(password);
    const rolePersistence = Role.create(role);

    const checkUser = await this.userRepository.getUserByCif(cifPersistence);

    if(checkUser) throw new CifAlreadyExistsException();

    const user = User.create(
      companyNamePersistence,
      cifPersistence,
      emailPersistence,
      passwordPersistence,
      rolePersistence,
      createdAt,
      modifiedAt,
      userId
    );

    await this.userRepository.postUser(user);
  };
}
