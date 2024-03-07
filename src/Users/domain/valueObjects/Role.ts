import { MandatoryFieldException } from "../../../shared/domain/exceptions/MandatoryFieldException.ts";
import { RoleIncorrectException } from "../exceptions/RoleIncorrectException.ts";

enum RolInterface {
  restaurant = "Restaurante",
  supplier = "Proveedor"
}

export class Role {
  public readonly role: string;

  private constructor(role: string) {
    this.role = role;
  }

  public static create(rol: string): Role {
    if(!rol) {
      throw new MandatoryFieldException("rol");
    }
    if(rol !== RolInterface.restaurant && rol !== RolInterface.supplier) {
      throw new RoleIncorrectException();
    }
    return new Role(rol);
  }

  public getRole(): string {
    return this.role;
  }
};
