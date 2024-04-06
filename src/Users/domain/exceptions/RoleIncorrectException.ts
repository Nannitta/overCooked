import { BaseException } from "../../../shared/domain/exceptions/BaseException.ts";
import { EXCEPTION_CODES } from "../../../shared/domain/exceptions/ExceptionCodes.ts";

export class RoleIncorrectException extends BaseException {
  constructor() {
    const message = "El Rol debe ser Restaurante o Proveedor";
    super(EXCEPTION_CODES.ROLE_INCORRECT, message);
  }
};
