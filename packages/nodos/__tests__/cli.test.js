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
  let result;
  const fillResult = (port, cb) => {
    result = port;
    cb();
  };
  const container = {
    nodos: () => ({ listen: fillResult }),
  };
  cli(
    ['--projectRoot', path.join(__dirname, '__fixtures__/app'), 'server'],
    { container, done, exitProcess: false },
  );

  expect(result).toBe(3000);
});
