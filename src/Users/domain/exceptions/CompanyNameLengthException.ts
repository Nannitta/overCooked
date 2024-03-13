import { BaseException } from "../../../shared/domain/exceptions/BaseException.ts";
import { EXCEPTION_CODES } from "../../../shared/domain/exceptions/ExceptionCodes.ts";

export class CompanyNameLengthException extends BaseException {
  constructor() {
    const message = "El nombre de la compañía debe tener entre 2 y 100 caracteres";
    super(EXCEPTION_CODES.COMPANYNAME_LENGTH, message);
  }
};
