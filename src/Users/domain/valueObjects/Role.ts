import { throwError } from "../../../shared/infraestructure/utils/errorHelper.ts";

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
      throw throwError("Debe seleccionar un rol", 403);
    }
    if(rol !== RolInterface.restaurant && rol !== RolInterface.supplier) {
      throw throwError("El rol debe ser Restaurante o Proveedor", 403);
    }
    return new Role(rol);
  }

  public getRole(): string {
    return this.role;
  }
};
