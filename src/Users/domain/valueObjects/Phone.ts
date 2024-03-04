import { throwError } from "../../../shared/infraestructure/utils/errorHelper.ts";

export class Phone {
  public readonly phone: string;

  private constructor(phone: string) {
    this.phone = phone;
  }

  public static create(phone: string): Phone {
    const PHONE_PATTERN = /^(\+?(\d{1,3}))?[-. ]?((\(\d{1,3}\))|\d{1,4})[-. ]?(\d{9,})$/;

    if(!phone) {
      throw throwError("El número de teléfono es obligatorio.", 403);
    }
    if(!PHONE_PATTERN.test(phone)) {
      throw throwError("El número de teléfono deber tener un formato válido.", 403);
    }
    return new Phone(phone);
  };

  public getPhone(): string {
    return this.phone;
  }
};
