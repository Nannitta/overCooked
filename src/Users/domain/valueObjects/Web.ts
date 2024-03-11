import { DomainFormatException } from "../exceptions/DomainFormatException.ts";

export class Web {
  public readonly web: string | null;

  private constructor(web: string | null) {
    this.web = web;
  }

  public static create(web: string | null): Web | null {
    const WEB_PATTERN = /^https:\/\/www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

    if(web) {
      if(!WEB_PATTERN.test(web)) {
        throw new DomainFormatException();
      }
      return new Web(web);
    }

    return null;
  }

  public getWeb(): string | null {
    return this.web;
  }
};
