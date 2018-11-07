import path from 'path';
import { bin } from '../lib';
import * as commands from '../lib/commands';

const projectRoot = path.join(__dirname, '__fixtures__/app');

test('nodos/bin/console', async () => {
  const replServer = { context: {} };
  const container = {
    repl: {
      start: () => replServer,
    },
  };
  const app = await bin(
    projectRoot,
    ['console'],
    {
      container,
    },
  );

  // expect(replServer.context).toHaveProperty('app');
});

test('nodos/bin/test', async () => {
  const run = jest.fn();
  const container = {
    jest: { run },
  };
  const app = await bin(
    projectRoot,
    ['test'],
    {
      container,
    },
  );

  // expect(replServer.context).toHaveProperty('app');
});

test('nodos/bin/server', async () => {
  const fillResult = (port, address, cb) => {
    cb();
  };
  const container = {
    nodos: () => ({
      start: jest.fn(),
      stop: jest.fn(),
      listen: fillResult,
      commands: [commands.serverCommand],
    }),
  };
  const app = await bin(
    projectRoot,
    ['server'],
    {
      container,
    },
  );
});

describe('nodos/bin/routes', () => {
  test('return valid routes presentation', async () => {
    const container = {
      print: (output) => { expect(output).toMatchSnapshot(); },
    };
    const app = await bin(
      projectRoot,
      ['routes'],
      {
        container,
      },
    );
  });

  test('return valid presentation when no routes defined', async () => {
    const container = {
      nodos: () => Promise.resolve({
        start: jest.fn(),
        stop: jest.fn(),
        router: { routes: [] },
        commands: [commands.routesCommand],
      }),
      print: (output) => { expect(output).toMatchSnapshot(); },
    };
    const app = await bin(
      projectRoot,
      ['routes'],
      {
        container,
      },
    );
  });
});
