import { BaseException } from "../../../shared/domain/exceptions/BaseException.ts";
import { EXCEPTION_CODES } from "../../../shared/domain/exceptions/ExceptionCodes.ts";

export class ProvinceFormatException extends BaseException {
  constructor() {
    const message = "El nombre de la provincia solo puede tener letras y espacios";
    super(EXCEPTION_CODES.PROVINCE_FORMAT, message);
  }
};
