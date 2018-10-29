import path from 'path';
import { bin, nodos } from '../src';

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

describe('nodos/binNodos/routes', () => {
  test('return valid routes presentation', (done) => {
    const container = {
      nodos: () => nodos(`${__dirname}/__fixtures__/app`),
      print: (output) => { expect(output).toMatchSnapshot(); },
    };
    bin.nodos(
      ['--projectRoot', path.join(__dirname, '__fixtures__/app'), 'routes'],
      { container, done },
    );
  });

  test('return valid presentation when no routes defined', (done) => {
    const container = {
      nodos: () => Promise.resolve({
        router: { routes: [] },
      }),
      print: (output) => { expect(output).toMatchSnapshot(); },
    };
    bin.nodos(
      ['--projectRoot', path.join(__dirname, '__fixtures__/app'), 'routes'],
      { container, done },
    );
  });
});
