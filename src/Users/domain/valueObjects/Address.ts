import { MandatoryFieldException } from "../../../shared/domain/exceptions/MandatoryFieldException.ts";
import { AddressLengthException } from "../exceptions/AddressLengthException.ts";

export class Address {
  public readonly address: string;

  private constructor(address: string) {
    this.address = address;
  }

  public static create(address: string): Address {
    if(!address) {
      throw new MandatoryFieldException("dirección");
    }
    if(address.length < 2 || address.length > 250) {
      throw new AddressLengthException();
    }
    return new Address(address);
  };

  public getAddress(): string {
    return this.address;
  }
};
