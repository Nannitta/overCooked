import { MandatoryFieldException } from "../../../shared/domain/exceptions/MandatoryFieldException.ts";
import { CityFormatException } from "../exceptions/CityFormatException.ts";
import { CityLengthException } from "../exceptions/CityLengthException.ts";

export class City {
  public readonly city: string;

  private constructor(city: string) {
    this.city = city;
  }

  public static create(city: string): City {
    const CITY_PATTERN = /^[A-Za-zñÑ\sáéíóúÁÉÍÓÚüÜ]+$/u;

    if(!city) {
      throw new MandatoryFieldException("ciudad");
    }
    if(city.length < 2 || city.length > 100) {
      throw new CityLengthException();
    }
    if(!CITY_PATTERN.test(city)) {
      throw new CityFormatException();
    }
    return new City(city);
  }

  public getCity(): string {
    return this.city;
  }
};
