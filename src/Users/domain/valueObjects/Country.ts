import { MandatoryFieldException } from "../../../shared/domain/exceptions/MandatoryFieldException.ts";
import { CountryFormatException } from "../exceptions/CountryFormatException.ts";

export class Country {
  public readonly country: string;

  private constructor(country: string) {
    this.country = country;
  }

  public static create(country: string): Country {
    const COUNTRY_PATTERN = /^[A-Za-zñÑ\sáéíóúÁÉÍÓÚüÜ]+$/u;

    if(!country) {
      throw new MandatoryFieldException("país");
    }
    if(!COUNTRY_PATTERN.test(country)) {
      throw new CountryFormatException();
    }
    return new Country(country);
  }

  public getCountry(): string {
    return this.country;
  }
};
