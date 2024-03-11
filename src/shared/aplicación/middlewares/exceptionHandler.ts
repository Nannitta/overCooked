import { HTTP_STATUS } from "../../constants/HttpCodes.ts";
import { BaseException } from "../../domain/exceptions/BaseException.ts";
import { EXCEPTION_CODES } from "../../domain/exceptions/ExceptionCodes.ts";
import type { Response } from "express";

const mapErrorCodeToHTTPCode = (error: BaseException): number => {
  switch(error.getExceptionCode()) {
    case EXCEPTION_CODES.MANDATORY_FIELD:
      return HTTP_STATUS.BAD_REQUEST;
    case EXCEPTION_CODES.COMPANYNAME_LENGTH:
      return HTTP_STATUS.BAD_REQUEST;
    case EXCEPTION_CODES.CIF_FORMAT:
      return HTTP_STATUS.BAD_REQUEST;
    case EXCEPTION_CODES.CIF_ALREADY_EXISTS:
      return HTTP_STATUS.BAD_REQUEST;
    case EXCEPTION_CODES.EMAIL_LENGTH:
      return HTTP_STATUS.BAD_REQUEST;
    case EXCEPTION_CODES.EMAIL_FORMAT:
      return HTTP_STATUS.BAD_REQUEST;
    case EXCEPTION_CODES.PASSWORD_FORMAT:
      return HTTP_STATUS.BAD_REQUEST;
    case EXCEPTION_CODES.PHONE_FORMAT:
      return HTTP_STATUS.BAD_REQUEST;
    case EXCEPTION_CODES.ADRESS_LENGTH:
      return HTTP_STATUS.BAD_REQUEST;
    case EXCEPTION_CODES.CITY_LENGTH:
      return HTTP_STATUS.BAD_REQUEST;
    case EXCEPTION_CODES.CITY_FORMAT:
      return HTTP_STATUS.BAD_REQUEST;
    case EXCEPTION_CODES.COUNTRY_FORMAT:
      return HTTP_STATUS.BAD_REQUEST;
    case EXCEPTION_CODES.PROVINCE_FORMAT:
      return HTTP_STATUS.BAD_REQUEST;
    case EXCEPTION_CODES.PROVINCE_LENGTH:
      return HTTP_STATUS.BAD_REQUEST;
    case EXCEPTION_CODES.POSTALCODE_FORMAT:
      return HTTP_STATUS.BAD_REQUEST;
    case EXCEPTION_CODES.DOMAIN_FORMAT:
      return HTTP_STATUS.BAD_REQUEST;
    case EXCEPTION_CODES.ROLE_INCORRECT:
      return HTTP_STATUS.BAD_REQUEST;
  }
};

export const exceptionHandler = (error: Error, res: Response): void => {
  if(error instanceof BaseException) {
    const { message } = error;
    const httpCode = mapErrorCodeToHTTPCode(error);

    res.status(httpCode).send({ error: message });
  } else {
    res.status(HTTP_STATUS.SERVER_ERROR).send({ error: "Ha ocurrido un error en el servidor", name: error.name, message: error.message });
  }
};
