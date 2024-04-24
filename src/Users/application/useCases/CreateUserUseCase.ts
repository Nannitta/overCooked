import { User } from "../../domain/entities/User.ts";
import { CifAlreadyExistsException } from "../../../shared/domain/exceptions/CifAlreadyExistsException.ts";
import type { UserRepository } from "../../domain/repositories/UserRepository.ts";
import { Cif } from "../../../shared/domain/valueObjects/Cif.ts";
import { CompanyName } from "../../../shared/domain/valueObjects/CompanyName.ts";
import { Email } from "../../../shared/domain/valueObjects/Email.ts";
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
    activationCode?: UUID,
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
      activationCode,
      createdAt,
      modifiedAt,
      userId
    );

    await this.userRepository.postUser(user);
  };
}
