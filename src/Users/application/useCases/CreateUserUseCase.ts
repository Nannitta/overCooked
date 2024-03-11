import { User } from "../../domain/entities/User.ts";
import { CifAlreadyExistsException } from "../../domain/exceptions/CifAlreadyExistsException.ts";
import type { UserRepository } from "../../domain/repositories/UserRepository.ts";
import { Address } from "../../domain/valueObjects/Address.ts";
import { Cif } from "../../domain/valueObjects/Cif.ts";
import { City } from "../../domain/valueObjects/City.ts";
import { CompanyName } from "../../domain/valueObjects/CompanyName.ts";
import { Country } from "../../domain/valueObjects/Country.ts";
import { Email } from "../../domain/valueObjects/Email.ts";
import { Password } from "../../domain/valueObjects/Password.ts";
import { Phone } from "../../domain/valueObjects/Phone.ts";
import { PostalCode } from "../../domain/valueObjects/PostalCode.ts";
import { Province } from "../../domain/valueObjects/Province.ts";
import { Role } from "../../domain/valueObjects/Role.ts";
import { Web } from "../../domain/valueObjects/Web.ts";
import type { UUID } from "node:crypto";

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
    role: string,
    web?: string,
    createdAt?: Date,
    modifiedAt?: Date,
    userId?: UUID
  ): Promise<void> => {
    const companyNamePersistence = CompanyName.create(companyName);
    const cifPersistence = Cif.create(CIF);
    const emailPersistence = Email.create(email);
    const passwordPersistence = Password.create(password);
    const phonePersistence = Phone.create(phone);
    const addressPersistence = Address.create(address);
    const cityPersistence = City.create(city);
    const countryPersistence = Country.create(country);
    const provincePersistence = Province.create(province);
    const postalCodePersistence = PostalCode.create(postalCode);
    const webPersistence = Web.create(web);
    const rolePersistence = Role.create(role);

    const checkUser = await this.userRepository.getUserByCif(cifPersistence);

    if(checkUser) throw new CifAlreadyExistsException();

    const user = User.create(
      companyNamePersistence,
      cifPersistence,
      emailPersistence,
      passwordPersistence,
      phonePersistence,
      addressPersistence,
      cityPersistence,
      countryPersistence,
      provincePersistence,
      postalCodePersistence,
      webPersistence,
      rolePersistence,
      createdAt,
      modifiedAt,
      userId
    );

    await this.userRepository.postUser(user);
  };
}
