import { BaseException } from "../../../shared/domain/exceptions/BaseException.ts";
import { EXCEPTION_CODES } from "../../../shared/domain/exceptions/ExceptionCodes.ts";

export class CityLengthException extends BaseException {
  constructor() {
    const message = "El nombre de la ciudad debe tener entre 2 y 100 caracteres";
    super(EXCEPTION_CODES.CITY_LENGTH, message);
  }
};
