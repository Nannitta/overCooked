import { BaseException } from "./BaseException.ts";
import { EXCEPTION_CODES } from "./ExceptionCodes.ts";

export class MandatoryFieldException extends BaseException {
  constructor(field: string) {
    const message = `El campo ${field} es obligatorio`;
    super(EXCEPTION_CODES.MANDATORY_FIELD, message);
  }
};
