import path from 'path';
import { nodos } from '@nodosjs/core';
import runCurrent from '../lib/current.js';

const projectRoot = path.join(__dirname, '../__fixtures__/application');

test('nodos/console', async () => {
  const replServer = { context: {} };
  const container = {
    repl: {
      start: () => replServer,
    },
  };

  const app = nodos(projectRoot);
  await runCurrent(app, { container, args: ['console'] });
  expect(replServer.context).toHaveProperty('app');
});

// NOTE jest somehow doesn't wait for all async functions to finish and calls check BEFORE mocked function call
// That's why currently we just need to put check after function call just by placing in later in event loop
test('nodos/server', async () => {
  const app = nodos(projectRoot);
  app.listen = jest.fn().mockResolvedValue(42);
  await runCurrent(app, { args: ['server'] });
  setTimeout(() => {
    expect(app.listen).toHaveBeenCalled();
  }, 0);
});

test('nodos/routes', async () => {
  const app = nodos(projectRoot);
  const container = {
    print: (output) => { expect(output).toMatchSnapshot(); },
  };
  await runCurrent(app, { container, args: ['routes'] });
});
