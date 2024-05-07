import request from "supertest";
import { app, closeServer } from "../../../server.ts";
import { UserPersistence } from "../../../src/Users/infraestructure/persistence/UserPersistence.ts";
import { CreateUserMother } from "../../unit/Users/domain/mothers/createUserMother.ts";

jest.mock("../../../src/Users/infraestructure/persistence/UserPersistence.ts");

const mockedUserPersistence = UserPersistence as jest.MockedClass<typeof UserPersistence>;

afterAll(() => {
  closeServer();
  jest.clearAllMocks();
});

describe("Acceptance test for post user", () => {
  it("As user I want to register an user in the application", async () => {
    const user = new CreateUserMother().random();
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
});
