import path from 'path';
import { nodos } from '../index.js';

const projectRoot = path.join(__dirname, '..', '__fixtures__', 'siteWithoutMiddlewares');

let app;

beforeEach(async () => {
  app = await nodos(projectRoot);
  await app.initApp();
});

test('get /', async () => {
  const result = await app.get('/');
  expect(result).toMatchObject({ statusCode: 200 });
});
