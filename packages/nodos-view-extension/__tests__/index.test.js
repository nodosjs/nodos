import path from 'path';
import qs from 'qs';
import { nodos } from '@nodosjs/core';
import extension from '../index.js';

const projectRoot = path.join(__dirname, '../__fixtures__/site');
let app;

beforeEach(async () => {
  app = await nodos(projectRoot, 'test');
  app.addExtension(extension);
  await app.initApp();
});

test('nodos/view', async () => {
  const result = await app.get('/');
  expect(result).toMatchObject({ statusCode: 200 });
  // expect(app).toMatchObject({
  //   container: {
  //     db: expect.any(Object),
  //   },
  // });
});

test('POST /users success', async () => {
  const params = qs.stringify({ user: { id: 4, name: 'gogo' } });
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const result = await app.post('/users', { params, headers });
  expect(result).toMatchObject({ statusCode: 302 });

  const result2 = await app.get('/users/4');
  expect(result2).toMatchObject({ statusCode: 200 });
});
