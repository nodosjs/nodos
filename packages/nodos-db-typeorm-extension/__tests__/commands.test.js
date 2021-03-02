// import _ from 'lodash';
import path from 'path';
import { nodos } from '@nodosjs/core';
// import { runCurrent } from '@nodosjs/cli';
import extension from '../index.js';

const projectRoot = path.join(__dirname, '../__fixtures__/application');

test('nodos/server', async () => {
  const app = nodos(projectRoot);
  await extension(app);
  // await runCurrent(app, { args: ['db', 'migrate'] });
  expect(true).toBe(true);
});
