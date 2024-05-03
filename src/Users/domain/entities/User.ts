import type { UUID } from "node:crypto";
import type { Cif } from "../../../shared/domain/valueObjects/Cif.ts";
import type { CompanyName } from "../../../shared/domain/valueObjects/CompanyName.ts";
import type { Email } from "../../../shared/domain/valueObjects/Email.ts";
import type { Password } from "../valueObjects/Password.ts";
import type { Role } from "../valueObjects/Role.ts";

export class User {
  private constructor(
    public readonly companyName: string,
    public readonly CIF: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: string,
    public readonly activationCode?: UUID,
    public readonly createdAt?: Date,
    public readonly modifiedAt?: Date,
    public readonly userId?: UUID
  ) {}

  public static create(
    companyName: CompanyName,
    CIF: Cif,
    email: Email,
    password: Password,
    role: Role,
    activationCode?: UUID,
    createdAt?: Date,
    modifiedAt?: Date,
    userId?: UUID
  ): User {
    return new User(
      companyName.getCompanyName(),
      CIF.getCif(),
      email.getEmail(),
      password.getPassword(),
      role.getRole(),
      activationCode,
      createdAt,
      modifiedAt,
      userId
    );
  }
}
