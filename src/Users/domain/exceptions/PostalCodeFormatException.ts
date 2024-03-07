import { BaseException } from "../../../shared/domain/exceptions/BaseException.ts";
import { EXCEPTION_CODES } from "../../../shared/domain/exceptions/ExceptionCodes.ts";

export class PostalCodeFormatException extends BaseException {
  constructor() {
    const message = "El código postal debe de tener un formato válido";
    super(EXCEPTION_CODES.POSTALCODE_FORMAT, message);
  }
};
