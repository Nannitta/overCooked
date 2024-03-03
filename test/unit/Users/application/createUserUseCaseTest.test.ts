import { CompanyName } from "../../../../src/Users/domain/valueObjects/CompanyName.ts";
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
});
