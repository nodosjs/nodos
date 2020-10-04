import path from 'path';
import { nodos } from '@nodosjs/core';
import extension from '../index.js';

const projectRoot = path.join(__dirname, '../__fixtures__/site');

test('nodos/view', async () => {
  const app = nodos(projectRoot, 'test');
  app.addExtension(extension);
  await app.initApp();

  const result = await app.get('/');
  expect(result).toMatchObject({ statusCode: 200 });
  // expect(app).toMatchObject({
  //   container: {
  //     db: expect.any(Object),
  //   },
  // });
});
