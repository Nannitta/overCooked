import { BaseException } from "./BaseException.ts";
import { EXCEPTION_CODES } from "./ExceptionCodes.ts";

export class CifFormatException extends BaseException {
  constructor() {
    const message = "El CIF debe tener un formato válido";
    super(EXCEPTION_CODES.CIF_FORMAT, message);
  }
};
