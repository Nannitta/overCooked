import type { Cif } from "../valueObjects/Cif.ts";
import type { CompanyName } from "../valueObjects/CompanyName.ts";

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
    public readonly web?: string,
    public readonly role?: string,
    public readonly createdAt?: Date,
    public readonly modifiedAt?: Date,
    public readonly userId?: string
  ) {
    this.companyName = companyName;
  }

  public static create(
    companyName: CompanyName,
    cif: Cif,
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
  ): User {
    return new User(
      companyName.getCompanyName(),
      cif.getCif(),
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
  }
}
