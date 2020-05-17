// import { BaseApplication } from '@nodosjs/application';
// import _ from 'lodash';
import path from 'path';
import { nodos } from '@nodosjs/core';
import buildExtension from '../index.js';

const projectRoot = path.join(__dirname, '__fixtures__/application');

test('nodos/db', async () => {
  const app = nodos(projectRoot);
  const extension = buildExtension();

  await extension(app);

  expect(app).toMatchObject({
    container: {
      db: expect.any(Object),
    },
  });
});
