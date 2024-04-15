import { BaseException } from "./BaseException.ts";
import { EXCEPTION_CODES } from "./ExceptionCodes.ts";

export class PhoneFormatException extends BaseException {
  constructor() {
    const message = "El número de teléfono deber tener un formato válido";
    super(EXCEPTION_CODES.PHONE_FORMAT, message);
  }
};
