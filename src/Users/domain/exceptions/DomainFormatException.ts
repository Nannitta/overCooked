import { BaseException } from "../../../shared/domain/exceptions/BaseException.ts";
import { EXCEPTION_CODES } from "../../../shared/domain/exceptions/ExceptionCodes.ts";

export class DomainFormatException extends BaseException {
  constructor() {
    const message = "Debe introducir una dirección web con un dominio válido";
    super(EXCEPTION_CODES.DOMAIN_FORMAT, message);
  }
};
