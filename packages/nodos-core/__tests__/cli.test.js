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

test('nodos/cli/test', (done) => {
  const run = jest.fn();
  const container = {
    jest: { run },
  };
  cli(
    ['--projectRoot', path.join(__dirname, '__fixtures__/app'), 'test'],
    { container, done },
  );

  // expect(replServer.context).toHaveProperty('app');
});

test('nodos/cli/server', (done) => {
  const fillResult = (port, address, cb) => {
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

describe('nodos/cli/routes', () => {
  test('return valid routes presentation', (done) => {
    const container = {
      print: (output) => { expect(output).toMatchSnapshot(); },
    };
    cli(
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
    cli(
      ['--projectRoot', path.join(__dirname, '__fixtures__/app'), 'routes'],
      { container, done },
    );
  });
});
