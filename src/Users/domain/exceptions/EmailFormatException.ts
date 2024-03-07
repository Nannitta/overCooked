import { BaseException } from "../../../shared/domain/exceptions/BaseException.ts";
import { EXCEPTION_CODES } from "../../../shared/domain/exceptions/ExceptionCodes.ts";

export class EmailFormatException extends BaseException {
  constructor() {
    const message = "El email debe tener un formato válido";
    super(EXCEPTION_CODES.EMAIL_FORMAT, message);
  }
};
