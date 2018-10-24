import { nodos } from '../src';

test('nodos', async () => {
  const app = await nodos(`${__dirname}/__fixtures__/app`);
  const result = await app.get('/');
  expect(result).toMatchObject({ statusCode: 200 });

  const result2 = await app.get('/users');
  expect(result2).toMatchObject({ statusCode: 200, body: 'users#index' });
});
