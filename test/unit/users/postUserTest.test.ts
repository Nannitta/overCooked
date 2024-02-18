import test from "node:test";
import assert from "node:assert";
import { FetchUser } from "../../../src/users/infrastructure/persistence/FetchUser.ts";
import crypto from "node:crypto";
import type { User } from '../../../src/users/domain/User.ts';

const fetchUser = new FetchUser();

const user: User = {
  userId: crypto.randomUUID(),
  companyName: "Nombre de ejemplo",
  cif: "12345678A",
  email: "ejemplo@email.com",
  password: "ABCabc123!",
  phone: "657834985",
  address: "Calle de ejemplo",
  city: "Ejemplo",
  country: "Spain",
  province: "Ejemplo",
  postalCode: "365289",
};

// Para ejecutar los test:  node --loader ts-node/esm ./path

test("create user", async () => {
  const tryCreateUser = async () => {
    try {  
      await fetchUser.postUser(user);
      return "ok";
    } catch (err) {
      throw new Error();
    }
  };
  
  const result = await tryCreateUser();
  assert.equal(result, "ok");
});
