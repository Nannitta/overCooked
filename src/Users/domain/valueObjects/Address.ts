import { throwError } from "../../../shared/infraestructure/utils/errorHelper.ts";

export class Address {
  public readonly address: string;

  private constructor(address: string) {
    this.address = address;
  }

  public static create(address: string): Address {
    if(!address) {
      throw throwError("La dirección de la empresa es obligatoria.", 403);
    }
    if(address.length < 2 || address.length > 250) {
      throw throwError("La dirección de la empresa debe tener entre 2 y 250 caracteres.", 403);
    }
    return new Address(address);
  };

  public getAddress(): string {
    return this.address;
  }
};
