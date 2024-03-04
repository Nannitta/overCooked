import { Cif } from "../../../../src/Users/domain/valueObjects/Cif.ts";
import { CompanyName } from "../../../../src/Users/domain/valueObjects/CompanyName.ts";
import { Email } from "../../../../src/Users/domain/valueObjects/Email.ts";
import { Password } from "../../../../src/Users/domain/valueObjects/Password.ts";
import { Phone } from "../../../../src/Users/domain/valueObjects/Phone.ts";
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
});
