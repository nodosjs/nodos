import { nodos } from '../src';

test('nodos', async () => {
  const app = await nodos(`${__dirname}/__fixtures__/app`);
  const result = await app.get('/');
  // FIXME: write tests
});
