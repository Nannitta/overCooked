import { BaseException } from "../../../shared/domain/exceptions/BaseException.ts";
import { EXCEPTION_CODES } from "../../../shared/domain/exceptions/ExceptionCodes.ts";

export class PhoneFormatException extends BaseException {
  constructor() {
    const message = "El número de teléfono deber tener un formato válido";
    super(EXCEPTION_CODES.PHONE_FORMAT, message);
  }
};
