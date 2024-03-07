import { BaseException } from "../../../shared/domain/exceptions/BaseException.ts";
import { EXCEPTION_CODES } from "../../../shared/domain/exceptions/ExceptionCodes.ts";

export class AddressLengthException extends BaseException {
  constructor() {
    const message = "La dirección de la empresa debe tener entre 2 y 250 caracteres";
    super(EXCEPTION_CODES.ADRESS_LENGTH, message);
  }
};
