import { BaseException } from "../../../shared/domain/exceptions/BaseException.ts";
import { EXCEPTION_CODES } from "../../../shared/domain/exceptions/ExceptionCodes.ts";

export class EmailLengthException extends BaseException {
  constructor() {
    const message = "El email no puede tener más de 100 caracteres";
    super(EXCEPTION_CODES.EMAIL_LENGTH, message);
  }
};
