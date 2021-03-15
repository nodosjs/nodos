// import { BaseApplication } from '@nodosjs/application';
// import _ from 'lodash';
import path from 'path';
import { nodos } from '@nodosjs/core';

const projectRoot = path.join(__dirname, '../__fixtures__/application');

test('nodos/db', async () => {
  const app = nodos(projectRoot);
  await app.initApp();

  expect(app).toMatchObject({
    container: {
      db: expect.any(Object),
    },
  });
});
