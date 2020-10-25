import path from 'path';
import { nodos } from '@nodosjs/core';
import { delay } from 'nanodelay';
import runCurrent from '../lib/current.js';

const projectRoot = path.join(__dirname, '../__fixtures__/site');

test('nodos/console', async () => {
  const replServer = { context: {} };
  const container = {
    repl: {
      start: () => replServer,
    },
  };

  const app = nodos(projectRoot);
  // app.listen = jest.fn().mockResolvedValue();
  await runCurrent(app, { container, exitProcess: false, args: ['console'] });
  expect(replServer.context).toHaveProperty('app');
});

test('nodos/server', async () => {
  const app = nodos(projectRoot, { mode: 'server' });
  app.listen = jest.fn().mockResolvedValue();
  await runCurrent(app, { exitProcess: false, args: ['server'] });
  // NOTE it seeems yargs run handlers as sync code
  await delay(10);
  expect(app.listen).toHaveBeenCalled();
});

test('nodos/routes', async () => {
  const app = nodos(projectRoot);
  const container = {
    print: (output) => { expect(output).toMatchSnapshot(); },
  };
  await runCurrent(app, { container, exitProcess: false, args: ['routes'] });
});
