import { promises as fsp } from 'fs';
import path from 'path';
import { nodos } from '@nodosjs/core';
// import execa from 'execa';

const projectRoot = path.join(__dirname, '..', '__fixtures__', 'siteWithoutMiddlewares');

let app;

beforeEach(async () => {
  app = await nodos(projectRoot);
  await app.initApp();
  await app.initServer();
});

test('get /', async () => {
  const result = await app.get('/');
  expect(result).toMatchObject({ statusCode: 200 });
});
