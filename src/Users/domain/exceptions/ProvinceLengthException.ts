import { BaseException } from "../../../shared/domain/exceptions/BaseException.ts";
import { EXCEPTION_CODES } from "../../../shared/domain/exceptions/ExceptionCodes.ts";

export class ProvinceLengthException extends BaseException {
  constructor() {
    const message = "La provincia no puede tener más de 100 caracteres";
    super(EXCEPTION_CODES.PROVINCE_LENGTH, message);
  }
};
