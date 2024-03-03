import { CompanyName } from "../valueObjects/CompanyName.ts";
import {
  type CustomError,
  throwError,
} from "../../../shared/infraestructure/utils/errorHelper.ts";

export class User {
  public readonly companyName: CompanyName;

  private constructor(
    companyName: CompanyName,
    public readonly CIF: string,
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
    companyNameData: string,
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
  ): User {
    const companyName = CompanyName.create(companyNameData);

    return new User(
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
  }
}
