import { MandatoryFieldException } from "../../../shared/domain/exceptions/MandatoryFieldException.ts";
import { PhoneFormatException } from "../exceptions/PhoneFormatException.ts";

export class Phone {
  public readonly phone: string;

  private constructor(phone: string) {
    this.phone = phone;
  }

  public static create(phone: string): Phone {
    const PHONE_PATTERN = /^(\+?(\d{1,3}))?[-. ]?((\(\d{1,3}\))|\d{1,4})[-. ]?(\d{9,})$/;

    if(!phone) {
      throw new MandatoryFieldException("teléfono");
    }
    if(!PHONE_PATTERN.test(phone)) {
      throw new PhoneFormatException();
    }
    return new Phone(phone);
  };

  public getPhone(): string {
    return this.phone;
  }
};
