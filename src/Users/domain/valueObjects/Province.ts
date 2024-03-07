import { MandatoryFieldException } from "../../../shared/domain/exceptions/MandatoryFieldException.ts";
import { ProvinceFormatException } from "../exceptions/ProvinceFormatExceptions.ts";
import { ProvinceLengthException } from "../exceptions/ProvinceLengthException.ts";

export class Province {
  public readonly province: string;

  private constructor(province: string) {
    this.province = province;
  }

  public static create(province: string): Province {
    const PROVINCE_PATTERN = /^[A-Za-zñÑ\sáéíóúÁÉÍÓÚüÜ]+$/u;

    if(!province) {
      throw new MandatoryFieldException("provincia");
    }
    if(province.length > 100) {
      throw new ProvinceLengthException();
    }
    if(!PROVINCE_PATTERN.test(province)) {
      throw new ProvinceFormatException();
    }
    return new Province(province);
  }

  public getProvince(): string {
    return this.province;
  }
};
