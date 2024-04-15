import { AddressLengthException } from "../../../../../src/Users/domain/exceptions/AddressLengthException.ts";
import { CityFormatException } from "../../../../../src/Users/domain/exceptions/CityFormatException.ts";
import { CityLengthException } from "../../../../../src/Users/domain/exceptions/CityLengthException.ts";
import { CountryFormatException } from "../../../../../src/Users/domain/exceptions/CountryFormatException.ts";
import { DomainFormatException } from "../../../../../src/Users/domain/exceptions/DomainFormatException.ts";
import { PasswordFormatException } from "../../../../../src/Users/domain/exceptions/PasswordFormatException.ts";
import { PostalCodeFormatException } from "../../../../../src/Users/domain/exceptions/PostalCodeFormatException.ts";
import { ProvinceFormatException } from "../../../../../src/Users/domain/exceptions/ProvinceFormatExceptions.ts";
import { ProvinceLengthException } from "../../../../../src/Users/domain/exceptions/ProvinceLengthException.ts";
import { RoleIncorrectException } from "../../../../../src/Users/domain/exceptions/RoleIncorrectException.ts";
import { Address } from "../../../../../src/Users/domain/valueObjects/Address.ts";
import { City } from "../../../../../src/Users/domain/valueObjects/City.ts";
import { Country } from "../../../../../src/Users/domain/valueObjects/Country.ts";
import { Password } from "../../../../../src/Users/domain/valueObjects/Password.ts";
import { PostalCode } from "../../../../../src/Users/domain/valueObjects/PostalCode.ts";
import { Province } from "../../../../../src/Users/domain/valueObjects/Province.ts";
import { Role } from "../../../../../src/Users/domain/valueObjects/Role.ts";
import { Web } from "../../../../../src/Users/domain/valueObjects/Web.ts";
import { MandatoryFieldException } from "../../../../../src/shared/domain/exceptions/MandatoryFieldException.ts";

describe("Unit test to user valueObjects", () => {
  const exampleUser = {
    companyName: "Ejemplo",
    cif: "A1234567A",
    email: "ejemplo@gmail.com",
    password: "ABCabc123!",
    phone: "+34-695782146",
    address: "Calle ejemplo, 123",
    city: "Ejemplo",
    country: "España",
    province: "Ejemplo",
    postalCode: "12345",
    web: "https://www.ejemplo.com",
    role: "Restaurante"
  };

  it("Shold throw an error when given an empty password", () => {
    try {
      Password.create("");
    } catch (error) {
      expect(error).toBeInstanceOf(MandatoryFieldException);
    }
  });

  it("Should throw an error when given password with incorrect format", () => {
    const password = "abc123";
    try {
      Password.create(password);
    } catch (error) {
      expect(error).toBeInstanceOf(PasswordFormatException);
    }
  });

  it("Should create a valid password", () => {
    const password = Password.create(exampleUser.password).getPassword();
    expect(password).toBe(exampleUser.password);
  });

  it("Should throw an error when given an empty address", () => {
    try {
      Address.create("");
    } catch (error) {
      expect(error).toBeInstanceOf(MandatoryFieldException);
    }
  });

  it("Should throw an error when given an address with incorrect length", () => {
    const addressLength1 = "A";
    const addressLength251 = "1234 Avenida de la Luna, Apartamento 567, Edificio Estrella Brillante, Sector Eclipse, Ciudad Astro, Planeta Galaxia, Sistema Estelar Vía Láctea, Galaxia Espiral, Grupo Local, Supercúmulo Virgo, Filamento Cósmico, Multiverso Infinito, Universo 1, Dimensiones Paralelas, 12345-6789";
    try {
      Address.create(addressLength1);
    } catch (error) {
      expect(error).toBeInstanceOf(AddressLengthException);
    }

    try {
      Address.create(addressLength251);
    } catch (error) {
      expect(error).toBeInstanceOf(AddressLengthException);
    }
  });

  it("Should create a valid address", () => {
    const address = Address.create(exampleUser.address).getAddress();
    expect(address).toBe(exampleUser.address);
  });

  it("Should throw an error when given an empty city", () => {
    try {
      City.create("");
    } catch (error) {
      expect(error).toBeInstanceOf(MandatoryFieldException);
    }
  });

  it("Should trhow an error when given a city with incorrect length", () => {
    const cityLength1 = "A";
    const cityLength101 = "Rincón de la Montaña Misteriosa entre Bosques Encantados y Prados Verdes bajo el Sol Radiante y el Cielo Azul Eterno";
    try {
      City.create(cityLength1);
    } catch (error) {
      expect(error).toBeInstanceOf(CityLengthException);
    }

    try {
      City.create(cityLength101);
    } catch (error) {
      expect(error).toBeInstanceOf(CityLengthException);
    }
  });

  it("Should throw an error when given a city with incorrect format", () => {
    const city = "33A";
    try {
      City.create(city);
    } catch (error) {
      expect(error).toBeInstanceOf(CityFormatException);
    }
  });

  it("Should create a valid city", () => {
    const city = City.create(exampleUser.city).getCity();
    expect(city).toBe(exampleUser.city);
  });

  it("Should throw an error when given an empty country", () => {
    try {
      Country.create("");
    } catch (error) {
      expect(error).toBeInstanceOf(MandatoryFieldException);
    }
  });

  it("Should throw an error when given a country with incorrect format", () => {
    const country = "12Esp";
    try {
      Country.create(country);
    } catch (error) {
      expect(error).toBeInstanceOf(CountryFormatException);
    }
  });

  it("Should create a valid country", () => {
    const country = Country.create(exampleUser.country).getCountry();
    expect(country).toBe(exampleUser.country);
  });

  it("Should throw an error when given an empty province", () => {
    try {
      Province.create("");
    } catch (error) {
      expect(error).toBeInstanceOf(MandatoryFieldException);
    }
  });

  it("Should throw an error when given a province with incorrect length", () => {
    const province = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae augue ac purus gravida dapibus. Aliquam erat volutpat.";
    try {
      Province.create(province);
    } catch (error) {
      expect(error).toBeInstanceOf(ProvinceLengthException);
    }
  });

  it("Should throw an error when given a province with incorrect format", () => {
    const province = "12Pontevedra";
    try {
      Province.create(province);
    } catch (error) {
      expect(error).toBeInstanceOf(ProvinceFormatException);
    }
  });

  it("Should create a valid province", () => {
    const province = Province.create(exampleUser.province).getProvince();
    expect(province).toBe(exampleUser.province);
  });

  it("Should throw an error when given an empty postalCode", () => {
    try {
      PostalCode.create("");
    } catch (error) {
      expect(error).toBeInstanceOf(MandatoryFieldException);
    }
  });

  it("Should throw an error when given a postalCode with incorrect format", () => {
    const postalCode = "cd234";
    try {
      PostalCode.create(postalCode);
    } catch (error) {
      expect(error).toBeInstanceOf(PostalCodeFormatException);
    }
  });

  it("Should create a valid postalCode", () => {
    const postalCode = PostalCode.create(exampleUser.postalCode).getPostalCode();
    expect(postalCode).toBe(exampleUser.postalCode);
  });

  it("Should throw an error when given an invalid domain", () => {
    const web = "abc.x";
    try {
      Web.create(web);
    } catch (error) {
      expect(error).toBeInstanceOf(DomainFormatException);
    }
  });

  it("Should create a valid domain", () => {
    const web = Web.create(exampleUser.web)?.getWeb();
    expect(web).toBe(exampleUser.web);
  });

  it("Should throw an error when given an empty role", () => {
    try {
      Role.create("");
    } catch (error) {
      expect(error).toBeInstanceOf(MandatoryFieldException);
    }
  });

  it("Should throw an error when given an incorrect role", () => {
    const role = "admin";
    try {
      Role.create(role);
    } catch (error) {
      expect(error).toBeInstanceOf(RoleIncorrectException);
    }
  });

  it("Should create a valid role", () => {
    const role = Role.create(exampleUser.role).getRole();
    expect(role).toBe(exampleUser.role);
  });
});
