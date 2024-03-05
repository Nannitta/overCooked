import { throwError } from "../../../shared/infraestructure/utils/errorHelper.ts";

export class Web {
  public readonly web: string;

  private constructor(web: string) {
    this.web = web;
  }

  public static create(web: string | undefined): Web | null {
    const WEB_PATTERN = /^https:\/\/www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

    if(web) {
      if(!WEB_PATTERN.test(web)) {
        throw throwError("La url de la web debe ser un dominio válido.", 403);
      }
      return new Web(web);
    }

    return null;
  }

  public getWeb(): string | null {
    return this.web;
  }
};
