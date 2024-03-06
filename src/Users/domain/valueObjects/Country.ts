import { throwError } from "../../../shared/infraestructure/utils/errorHelper.ts";

export class Country {
  public readonly country: string;

  private constructor(country: string) {
    this.country = country;
  }

  public static create(country: string): Country {
    const COUNTRY_PATTERN = /^[A-Za-zñÑ\sáéíóúÁÉÍÓÚüÜ]+$/u;

    if(!country) {
      throw throwError("El país es obligatorio.", 403);
    }
    if(!COUNTRY_PATTERN.test(country)) {
      throw throwError("El nombre del país solo puede contener letras y espacios.", 403);
    }
    return new Country(country);
  }

  public getCountry(): string {
    return this.country;
  }
};
