/* import test from 'node:test';
import assert from 'node:assert';
import { FetchUser } from '../../../src/users/infraestructure/persistence/FetchUser.ts';
import type { User } from '../../../src/users/domain/User.ts';
import { generateUUID } from '../../../src/utils/generateUUID.ts';

//const fetchUser = new FetchUser();

const user: User = {
  userId: generateUUID(),
  companyName: 'Nombre de ejemplo',
  CIF: '12345678A',
  email: 'ejemplo@email.com',
  password: 'ABCabc123!',
  phone: '657834985',
  address: 'Calle de ejemplo',
  city: 'Ejemplo',
  country: 'Spain',
  province: 'Ejemplo',
  postalCode: '365289'
};

// Para ejecutar los test:  node --loader ts-node/esm ./path

void test('create user', async () => {
  const tryCreateUser = async (): Promise<string> => {
    try {
      await fetchUser.postUser(user);
      return 'ok';
    } catch (err) {
      throw new Error();
    }
  };

  const result = await tryCreateUser();
  assert.equal(result, 'ok');
}); */
