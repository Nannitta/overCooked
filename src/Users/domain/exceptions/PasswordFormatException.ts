import { BaseException } from "../../../shared/domain/exceptions/BaseException.ts";
import { EXCEPTION_CODES } from "../../../shared/domain/exceptions/ExceptionCodes.ts";

export class PasswordFormatException extends BaseException {
  constructor() {
    const message = "La contraseña debe tener entre 8 y 20 caracteres, contener una minúscula, una mayúscula, un número y un caracter especial";
    super(EXCEPTION_CODES.PASSWORD_FORMAT, message);
  }
};
