import { Address } from "../../../../src/Users/domain/valueObjects/Address.ts";
import { Cif } from "../../../../src/Users/domain/valueObjects/Cif.ts";
import { CompanyName } from "../../../../src/Users/domain/valueObjects/CompanyName.ts";
import { Email } from "../../../../src/Users/domain/valueObjects/Email.ts";
import { Password } from "../../../../src/Users/domain/valueObjects/Password.ts";
import { Phone } from "../../../../src/Users/domain/valueObjects/Phone.ts";
import { PostalCode } from "../../../../src/Users/domain/valueObjects/PostalCode.ts";
import { throwError } from "../../../../src/shared/infraestructure/utils/errorHelper.ts";

describe("Create user useCase", () => {
  it("Should throw an error when given an empty companyName", () => {
    expect(() => CompanyName.create("")).toThrow(throwError("El nombre de la empresa es obligatorio.", 403));
  });

  it("Should throw an error when given companyNames with incorrect length", () => {
    const companyNameLength1 = "A";
    const companyNameLength101 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor nisl quis velit mattis, eget fermentum metus vestibulum.";
    expect(() => CompanyName.create(companyNameLength1)).toThrow(throwError("El nombre de la empresa debe tener entre 2 y 100 caracteres", 403));
    expect(() => CompanyName.create(companyNameLength101)).toThrow(throwError("El nombre de la empresa debe tener entre 2 y 100 caracteres", 403));
  });

  it("Should create a valid companyName", () => {
    const companyName = CompanyName.create("Mar ao Xeito").getCompanyName();
    expect(companyName).toBe(("Mar ao Xeito"));
  });

  it("Should throw an error when given an empty cif", () => {
    expect(() => Cif.create("")).toThrow(throwError("El CIF de la empresa es obligatorio.", 403));
  });

  it("Should throw an error when given cif with incorrect format", () => {
    const cif = "123456";
    expect(() => Cif.create(cif)).toThrow(throwError("El CIF debe tener un formato válido.", 403));
  });

  it("Should create a valid cif", () => {
    const cif = Cif.create("A1234567A").getCif();
    expect(cif).toBe("A1234567A");
  });

  it("Should throw an error when given an empty email", () => {
    expect(() => Email.create("")).toThrow(throwError("El email es obligatorio.", 403));
  });

  it("Should throw an error when given email with incorrect length", () => {
    const emailLength101 = "ejemplo123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890@example.com";
    expect(() => Email.create(emailLength101)).toThrow(throwError("El email no puede tener más de 100 caracteres.", 403));
  });

  it("Should throw an error when given email with incorrect format", () => {
    const email = "ejemploejemplo.com";
    expect(() => Email.create(email)).toThrow(throwError("El email debe tener un formato válido.", 403));
  });

  it("Should create a valid email", () => {
    const email = Email.create("ejemplo@ejemplo.com").getEmail();
    expect(email).toBe("ejemplo@ejemplo.com");
  });

  it("Shold throw an error when given an empty password", () => {
    expect(() => Password.create("")).toThrow(throwError("La contraseña es obligatoria.", 403));
  });

  it("Should throw an error when given password with incorrect format", () => {
    const password = "abc123";
    expect(() => Password.create(password)).toThrow(throwError("La contraseña debe tener entre 8 y 20 caracteres, contener una minúscula, una mayúscula, un número y un caracter especial.", 403));
  });

  it("Should create a valid password", () => {
    const password = "ABCabc123!";
    expect(password).toBe("ABCabc123!");
  });

  it("Should throw an error when given an empty phone", () => {
    expect(() => Phone.create("")).toThrow(throwError("El número de teléfono es obligatorio.", 403));
  });

  it("Should throw an error when given phone with incorrect format", () => {
    const phone = "65243n";
    expect(() => Phone.create(phone)).toThrow(throwError("El número de teléfono deber tener un formato válido.", 403));
  });

  it("Should create a valid phone", () => {
    const phone = "653258965";
    expect(phone).toBe("653258965");
  });

  it("Should throw an error when given an empty address", () => {
    expect(() => Address.create("")).toThrow(throwError("La dirección de la empresa es obligatoria.", 403));
  });

  it("Should throw an error when given an address with incorrect length", () => {
    const addressLength1 = "A";
    const addressLength251 = "1234 Avenida de la Luna, Apartamento 567, Edificio Estrella Brillante, Sector Eclipse, Ciudad Astro, Planeta Galaxia, Sistema Estelar Vía Láctea, Galaxia Espiral, Grupo Local, Supercúmulo Virgo, Filamento Cósmico, Multiverso Infinito, Universo 1, Dimensiones Paralelas, 12345-6789";
    expect(() => Address.create(addressLength1)).toThrow(throwError("La dirección de la empresa debe tener entre 2 y 250 caracteres.", 403));
    expect(() => Address.create(addressLength251)).toThrow(throwError("La dirección de la empresa debe tener entre 2 y 250 caracteres.", 403));
  });

  it("Should create a valid address", () => {
    const address = "Calle sin nombre 123";
    expect(address).toBe("Calle sin nombre 123");
  });

  it("Should throw an error when given an empty postalCode", () => {
    expect(() => PostalCode.create("")).toThrow(throwError("El código postal es obligatorio.", 403));
  });

  it("Should throw an error when given a postalCode with incorrect format", () => {
    const postalCode = "cd234";
    expect(() => PostalCode.create(postalCode)).toThrow(throwError("El código postal debe tener un formato válido.", 403));
  });

  it("Should create a valid postalCode", () => {
    const postalCode = "36900";
    expect(postalCode).toBe("36900");
  });
});
