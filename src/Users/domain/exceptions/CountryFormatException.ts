import { BaseException } from "../../../shared/domain/exceptions/BaseException.ts";
import { EXCEPTION_CODES } from "../../../shared/domain/exceptions/ExceptionCodes.ts";

export class CountryFormatException extends BaseException {
  constructor() {
    const message = "El nombre del país solo puede contener letras y espacios";
    super(EXCEPTION_CODES.COUNTRY_FORMAT, message);
  }
};
