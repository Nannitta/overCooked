import type { EXCEPTION_CODES } from "./ExceptionCodes.ts";

export class BaseException extends Error {
  constructor(protected exceptionCode: EXCEPTION_CODES, public message: string) {
    super();
  }

  getExceptionCode(): EXCEPTION_CODES {
    return this.exceptionCode;
  }

  getMessage(): string {
    return this.message;
  }
};
