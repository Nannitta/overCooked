import { throwError } from "../../../shared/infraestructure/utils/errorHelper.ts";

export class City {
  public readonly city: string;

  private constructor(city: string) {
    this.city = city;
  }

  public static create(city: string): City {
    const CITY_PATTERN = /^[A-Za-zñÑ\sáéíóúÁÉÍÓÚüÜ]+$/u;

    if(!city) {
      throw throwError("La ciudad es obligatoria.", 403);
    }
    if(city.length < 2 || city.length > 100) {
      throw throwError("El nombre de la ciudad debe tener entre 2 y 100 caracteres", 403);
    }
    if(!CITY_PATTERN.test(city)) {
      throw throwError("El nombre de la ciudad solo puede contener letras y espacios.", 403);
    }
    return new City(city);
  }

  public getCity(): string {
    return this.city;
  }
};
