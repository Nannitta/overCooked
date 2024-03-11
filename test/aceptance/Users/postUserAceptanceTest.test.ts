import request from "supertest";
import { app } from "../../../server.ts";
import { getPool, closePool } from "../../../src/shared/infraestructure/db/connectDB.ts";
import type mysql from "mysql2/promise";

let pool: mysql.Pool;

beforeAll(async () => {
  pool = getPool();
});

afterAll(async () => {
  await closePool(pool);
});

describe("Aceptance test for post user", () => {
  it("As user I want to register a user in the application", async () => {
    const user = {
      companyName: "Ejemplo 1",
      CIF: "A1234567A",
      email: "ejemplo1@gmail.com",
      password: "ABCabc123!",
      phone: "+34-695782146",
      address: "Calle ejemplo, 123",
      city: "Ejemplo",
      country: "España",
      province: "Ejemplo",
      postalCode: "12345",
      web: "https://www.ejemplo1.com",
      role: "Restaurante"
    };

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
  });
});
