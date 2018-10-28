import path from 'path';
import { bin } from '../src';

test('nodos/binNodos/console', (done) => {
  const replServer = { context: {} };
  const container = {
    repl: {
      start: () => replServer,
    },
  };
  bin.nodos(
    ['--projectRoot', path.join(__dirname, '__fixtures__/app'), 'console'],
    { container, done, exitProcess: false },
  );

  expect(replServer.context).toHaveProperty('app');
});

test('nodos/binNodos/server', (done) => {
  const fillResult = (port, cb) => {
    cb();
  };
  const container = {
    nodos: () => Promise.resolve({ listen: fillResult }),
  };
  bin.nodos(
    ['--projectRoot', path.join(__dirname, '__fixtures__/app'), 'server'],
    { container, done, exitProcess: false },
  );
});
