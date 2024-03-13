import request from "supertest";
import { app } from "../../../server.ts";
import { UserPersistence } from "../../../src/Users/infraestructure/persistence/UserPersistence.ts";
import { UserMother } from "../../unit/Users/domain/mothers/userMother.ts";

jest.mock("../../../src/Users/infraestructure/persistence/UserPersistence.ts");

const mockedUserPersistence = UserPersistence as jest.MockedClass<typeof UserPersistence>;

describe("Aceptance test for post user", () => {
  it("As user I want to register an user in the application", async () => {
    const user = new UserMother().random();
    const mockedPostUser = mockedUserPersistence.prototype.postUser.mockResolvedValue();

    const response = await request(app)
      .post("/user/register")
      .send(user)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body).toEqual({
      status: "Ok",
      message: "Usuario creado correctamente"
    });

    expect(mockedPostUser).toHaveBeenCalledWith(user);
  });

  it("Should throw an error when given an empty companyName", async () => {
    const user = {
      companyName: ""
    };

    const response = await request(app)
      .post("/user/register")
      .send(user)
      .expect(403);
    expect(response.body).toEqual({ error: "El campo nombre de la compañia es obligatorio" });
  });

  it("Should throw an error when given a companyName with incorrect length", async () => {
    const user = {
      companyName: "A"
    };

    const response = await request(app)
      .post("/user/register")
      .send(user)
      .expect(403);
    expect(response.body).toEqual({ error: "El nombre de la compañía debe tener entre 2 y 100 caracteres" });
  });
});
