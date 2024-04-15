import { CifFormatException } from "../../../../../src/shared/domain/exceptions/CifFormatException.ts";
import { CompanyNameLengthException } from "../../../../../src/shared/domain/exceptions/CompanyNameLengthException.ts";
import { EmailFormatException } from "../../../../../src/shared/domain/exceptions/EmailFormatException.ts";
import { EmailLengthException } from "../../../../../src/shared/domain/exceptions/EmailLengthException.ts";
import { MandatoryFieldException } from "../../../../../src/shared/domain/exceptions/MandatoryFieldException.ts";
import { PhoneFormatException } from "../../../../../src/shared/domain/exceptions/PhoneFormatException.ts";
import { Cif } from "../../../../../src/shared/domain/valueObjects/Cif.ts";
import { CompanyName } from "../../../../../src/shared/domain/valueObjects/CompanyName.ts";
import { Email } from "../../../../../src/shared/domain/valueObjects/Email.ts";
import { Phone } from "../../../../../src/shared/domain/valueObjects/Phone.ts";

describe("Unit test to companyName valueObject", () => {
  it("Should throw an error when given an empty companyName", () => {
    try {
      CompanyName.create("");
    } catch (error) {
      expect(error).toBeInstanceOf(MandatoryFieldException);
    }
  });

  it("Should throw an error when given companyName with incorrect length", () => {
    const companyNameLength1 = "A";
    const companyNameLength101 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor nisl quis velit mattis, eget fermentum metus vestibulum.";

    try {
      CompanyName.create(companyNameLength1);
    } catch (error) {
      expect(error).toBeInstanceOf(CompanyNameLengthException);
    }

    try {
      CompanyName.create(companyNameLength101);
    } catch (error) {
      expect(error).toBeInstanceOf(CompanyNameLengthException);
    }
  });

  it("Should create a valid companyName", () => {
    const validCompanyName = "Ejemplo";

    const companyName = CompanyName.create(validCompanyName).getCompanyName();
    expect(companyName).toBe((validCompanyName));
  });
});

describe("Unit test to cif valueObject", () => {
  it("Should throw an error when given an empty cif", () => {
    try {
      Cif.create("");
    } catch (error) {
      expect(error).toBeInstanceOf(MandatoryFieldException);
    }
  });

  it("Should throw an error when given cif with incorrect format", () => {
    const cif = "123456";
    try {
      Cif.create(cif);
    } catch (error) {
      expect(error).toBeInstanceOf(CifFormatException);
    }
  });

  it("Should create a valid cif", () => {
    const validCif = "A1234567A";

    const cif = Cif.create(validCif).getCif();
    expect(cif).toBe(validCif);
  });
});

describe("Unit test to email valueObject", () => {
  it("Should throw an error when given an empty email", () => {
    try {
      Email.create("");
    } catch (error) {
      expect(error).toBeInstanceOf(MandatoryFieldException);
    }
  });

  it("Should throw an error when given email with incorrect length", () => {
    const emailLength101 = "ejemplo123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890@example.com";
    try {
      Email.create(emailLength101);
    } catch (error) {
      expect(error).toBeInstanceOf(EmailLengthException);
    }
  });

  it("Should throw an error when given email with incorrect format", () => {
    const email = "ejemploejemplo.com";
    try {
      Email.create(email);
    } catch (error) {
      expect(error).toBeInstanceOf(EmailFormatException);
    }
  });

  it("Should create a valid email", () => {
    const validEmail = "ejemplo@gmail.com";

    const email = Email.create(validEmail).getEmail();
    expect(email).toBe(validEmail);
  });
});

describe("Unit test to phone valueObject", () => {
  it("Should throw an error when given an empty phone", () => {
    try {
      Phone.create("");
    } catch (error) {
      expect(error).toBeInstanceOf(MandatoryFieldException);
    }
  });

  it("Should throw an error when given phone with incorrect format", () => {
    const phone = "65243n";
    try {
      Phone.create(phone);
    } catch (error) {
      expect(error).toBeInstanceOf(PhoneFormatException);
    }
  });

  it("Should create a valid phone", () => {
    const validPhone = "+34-695782146";
    const phone = Phone.create(validPhone).getPhone();
    expect(phone).toBe(validPhone);
  });
});
