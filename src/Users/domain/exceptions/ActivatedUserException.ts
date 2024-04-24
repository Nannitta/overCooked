import { BaseException } from "../../../shared/domain/exceptions/BaseException.ts";
import { EXCEPTION_CODES } from "../../../shared/domain/exceptions/ExceptionCodes.ts";

export class ActivatedUserException extends BaseException {
  constructor() {
    const message = "Debes activar tu usuario, revisa tu correo o la bandeja de spam";
    super(EXCEPTION_CODES.ACTIVATED_USER, message);
  }
};
