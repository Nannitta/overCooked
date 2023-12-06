import test from "node:test";
import assert from "node:assert";
import { FetchUser } from "../../../src/users/infrastructure/persistence/FetchUser.ts";
import crypto from "node:crypto";

const fetchUser = new FetchUser();

const user = {
  userId: crypto.randomUUID(),
  companyName: "Mar ao xeito",
  cif: "123456L",
  email: "maroaxeito@email.com",
  password: "ABCabc123!",
  phone: "657834923",
  address: "Calle sin nombre 123",
  city: "Marín",
  country: "Spain",
  province: "Pontevedra",
  postalCode: "365289",
};

// Para ejecutar los test:  node --loader ts-node/esm ./path

test("create user", async () => {
  const tryCreateUser = async () => {
    try {
      const response = await fetchUser.postUser(user);
      console.log(response);
      return "ok";
    } catch (error) {
      throw new Error();
    }
  };

  assert.equal(tryCreateUser, "ok");
});

test("1 is equal to 1.", () => {
  assert.strictEqual(1, 1);
});
