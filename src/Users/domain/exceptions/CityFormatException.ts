import { BaseException } from "../../../shared/domain/exceptions/BaseException.ts";
import { EXCEPTION_CODES } from "../../../shared/domain/exceptions/ExceptionCodes.ts";

export class CityFormatException extends BaseException {
  constructor() {
    const message = "El nombre de la ciudad solo puede contener letras y espacios";
    super(EXCEPTION_CODES.CITY_FORMAT, message);
  }
};
