import { throwError } from "../../../shared/infraestructure/utils/errorHelper.ts";
import { User } from "../../domain/entities/User.ts";
import type { UserRepository } from "../../domain/repositories/UserRepository.ts";
import { Cif } from "../../domain/valueObjects/Cif.ts";
import { CompanyName } from "../../domain/valueObjects/CompanyName.ts";
import { Email } from "../../domain/valueObjects/Email.ts";
import { Password } from "../../domain/valueObjects/Password.ts";

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute = async (
    companyName: string,
    CIF: string,
    email: string,
    password: string,
    phone: string,
    address: string,
    city: string,
    country: string,
    province: string,
    postalCode: string,
    web?: string,
    role?: string,
    createdAt?: Date,
    modifiedAt?: Date,
    userId?: string
  ): Promise<void> => {
    const companyNamePersistence = CompanyName.create(companyName);
    const cifPersistence = Cif.create(CIF);
    const emailPersistence = Email.create(email);
    const passwordPersistence = Password.create(password);
    const idUser = await this.userRepository.getUserIdByCif(cifPersistence);

    if(idUser) throw throwError("El CIF indicado ya está en uso", 403);

    const user = User.create(
      companyNamePersistence,
      cifPersistence,
      emailPersistence,
      passwordPersistence,
      phone,
      address,
      city,
      country,
      province,
      postalCode,
      web,
      role,
      createdAt,
      modifiedAt,
      userId
    );

    await this.userRepository.postUser(user);
  };
}
