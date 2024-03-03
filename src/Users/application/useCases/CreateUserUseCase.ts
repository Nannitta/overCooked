import { User } from "../../domain/entities/User.ts";
import type { UserRepository } from "../../domain/repositories/UserRepository.ts";
import { CompanyName } from "../../domain/valueObjects/CompanyName.ts";

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
    const user = User.create(
      companyName,
      CIF,
      email,
      password,
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
