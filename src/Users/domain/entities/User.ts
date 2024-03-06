import type { Address } from "../valueObjects/Address.ts";
import type { Cif } from "../valueObjects/Cif.ts";
import type { City } from "../valueObjects/City.ts";
import type { CompanyName } from "../valueObjects/CompanyName.ts";
import type { Country } from "../valueObjects/Country.ts";
import type { Email } from "../valueObjects/Email.ts";
import type { Password } from "../valueObjects/Password.ts";
import type { Phone } from "../valueObjects/Phone.ts";
import type { PostalCode } from "../valueObjects/PostalCode.ts";
import type { Province } from "../valueObjects/Province.ts";
import type { Role } from "../valueObjects/Role.ts";
import type { Web } from "../valueObjects/Web.ts";

export class User {
  private constructor(
    public readonly companyName: string,
    public readonly cif: string,
    public readonly email: string,
    public readonly password: string,
    public readonly phone: string,
    public readonly address: string,
    public readonly city: string,
    public readonly country: string,
    public readonly province: string,
    public readonly postalCode: string,
    public readonly role: string,
    public readonly web?: string | null,
    public readonly createdAt?: Date,
    public readonly modifiedAt?: Date,
    public readonly userId?: string
  ) {}

  public static create(
    companyName: CompanyName,
    cif: Cif,
    email: Email,
    password: Password,
    phone: Phone,
    address: Address,
    city: City,
    country: Country,
    province: Province,
    postalCode: PostalCode,
    web: Web | null,
    role: Role,
    createdAt?: Date,
    modifiedAt?: Date,
    userId?: string
  ): User {
    return new User(
      companyName.getCompanyName(),
      cif.getCif(),
      email.getEmail(),
      password.getPassword(),
      phone.getPhone(),
      address.getAddress(),
      city.getCity(),
      country.getCountry(),
      province.getProvince(),
      postalCode.getPostalCode(),
      role.getRole(),
      web?.getWeb(),
      createdAt,
      modifiedAt,
      userId
    );
  }
}
