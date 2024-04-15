import { BaseException } from "./BaseException.ts";
import { EXCEPTION_CODES } from "./ExceptionCodes.ts";

export class EmailLengthException extends BaseException {
  constructor() {
    const message = "El email no puede tener más de 100 caracteres";
    super(EXCEPTION_CODES.EMAIL_LENGTH, message);
  }
};
