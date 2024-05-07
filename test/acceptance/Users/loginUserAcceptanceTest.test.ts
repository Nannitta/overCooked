/* import request from "supertest";
import { app, closeServer } from "../../../server.ts";
import { LoginUserPersistence } from "../../../src/Users/infraestructure/persistence/LoginUserPersistence.ts";
import { LoginUserMother } from "../../unit/Users/domain/mothers/loginUserMother.ts";

jest.mock("../../../src/Users/infraestructure/persistence/LoginUserPersistence.ts");

const mockedLoginUserPersistence = LoginUserPersistence as jest.MockedClass<typeof LoginUserPersistence>;

afterAll(() => {
  closeServer();
  jest.clearAllMocks();
});

describe("Acceptance test for login user", () => {
  it("As user I want to login in the application", async () => {
    const loginUser = new LoginUserMother().random();
    const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjczZDg1ZDFmLTFjZTItNDE3OC05NjUxLTA1Njk1YTNiYmVjOCIsInJvbGUiOiJSZXN0YXVyYW50ZSIsImlhdCI6MTcxNDg1MDc0NiwiZXhwIjoxNzE1NDU1NTQ2fQ.ZjA_Q_N8jCcBQABLxPnsta-rIi8DV6fQlw1esULVW7k";

    const response = await request(app)
      .post("/user/login")
      .send(loginUser)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body).toEqual({
      status: "Ok",
      message: "Usuario logueado correctamente",
      token
    });

    expect(token).toHaveBeenCalledWith(loginUser);
  });
}); */
