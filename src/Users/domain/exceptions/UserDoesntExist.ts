import { BaseException } from "../../../shared/domain/exceptions/BaseException.ts";
import { EXCEPTION_CODES } from "../../../shared/domain/exceptions/ExceptionCodes.ts";

export class UserDoesntExist extends BaseException {
  constructor() {
    const message = "Email y/o contraseña incorrectos";
    super(EXCEPTION_CODES.USER_DOESNT_EXIST, message);
  }
};
