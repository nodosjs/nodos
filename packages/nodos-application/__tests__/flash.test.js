import nodos from '../lib/nodos';

let app;

beforeEach(async () => {
  app = await nodos(`${__dirname}/__fixtures__/app`);
  await app.start();
});

test('POST /users success', async () => {
  const params = { user: { id: 5, name: 'Flash' } };
  const result = await app.post('/users', {
    params,
  });

  const cookie = result.headers['set-cookie'];

  const result2 = await app.get(
    '/users/5',
    { headers: { cookie } },
  );
  expect(result2).toMatchObject({ body: '<span>User created!</span><h3>Flash</h3>' });

  const result3 = await app.get(
    '/users/5',
    { headers: { cookie } },
  );
  expect(result3).toMatchObject({ body: '<h3>Flash</h3>' });
});
