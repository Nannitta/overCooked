import { throwError } from "../../../shared/infraestructure/utils/errorHelper.ts";

export class Province {
  public readonly province: string;

  private constructor(province: string) {
    this.province = province;
  }

  public static create(province: string): Province {
    const PROVINCE_PATTERN = /^[A-Za-zñÑ\sáéíóúÁÉÍÓÚüÜ]+$/u;

    if(!province) {
      throw throwError("La provincia es obligatoria.", 403);
    }
    if(province.length > 100) {
      throw throwError("La provincia no puede tener más de 100 caracteres.", 403);
    }
    if(!PROVINCE_PATTERN.test(province)) {
      throw throwError("El nombre de la provincia solo puede tener letras y espacios.", 403);
    }
    return new Province(province);
  }

  public getProvince(): string {
    return this.province;
  }
};
