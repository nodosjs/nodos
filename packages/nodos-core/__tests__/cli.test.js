import path from 'path';
import { cli } from '../src';

test('nodos/cli/console', (done) => {
  const replServer = { context: {} };
  const container = {
    repl: {
      start: () => replServer,
    },
  };
  cli(
    ['--projectRoot', path.join(__dirname, '__fixtures__/app'), 'console'],
    { container, done, exitProcess: false },
  );

  expect(replServer.context).toHaveProperty('app');
});

test('nodos/cli/server', (done) => {
  const fillResult = (port, cb) => {
    cb();
  };
  const container = {
    nodos: () => Promise.resolve({ listen: fillResult }),
  };
  cli(
    ['--projectRoot', path.join(__dirname, '__fixtures__/app'), 'server'],
    { container, done, exitProcess: false },
  );
});
