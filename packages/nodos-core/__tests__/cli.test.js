import path from 'path';
import { cli } from '../src';
import * as commandBuilders from '../src/commands';

const projectRoot = path.join(__dirname, '__fixtures__/app');

// FIXME: Несмотря на то что хандлеры поддерживают асинки, сам вызов yargs (через наш cli) нельзя вызвать через async. Это приводит к тому что приходится прокидывать `done` и явно вызывать его внутри. Соответственно если хандлер асинхронный, то невозможно выполнить expect. Надо найти способ вызывать yargs через async, тогда все сильно упроститься в том числе интерфейсы взаимодействия с командами.

test('nodos/cli/console', (done) => {
  const replServer = { context: {} };
  const container = {
    repl: {
      start: () => replServer,
    },
  };
  cli(
    ['console'],
    {
      container, done, projectRoot, exitProcess: false,
    },
  );

  // expect(replServer.context).toHaveProperty('app');
});

test('nodos/cli/test', (done) => {
  const run = jest.fn();
  const container = {
    jest: { run },
  };
  cli(
    ['test'],
    {
      container, done, projectRoot, exitProcess: false,
    },
  );

  // expect(replServer.context).toHaveProperty('app');
});

test('nodos/cli/server', (done) => {
  const fillResult = (port, address, cb) => {
    cb();
  };
  const container = {
    nodos: () => ({
      close: jest.fn(),
      listen: fillResult,
      commandBuilders: [commandBuilders.serverCommand],
    }),
  };
  cli(
    ['server'],
    {
      container, done, projectRoot, exitProcess: false,
    },
  );
});

describe('nodos/cli/routes', () => {
  test('return valid routes presentation', (done) => {
    const container = {
      print: (output) => { expect(output).toMatchSnapshot(); },
    };
    cli(
      ['routes'],
      {
        container, done, projectRoot, exitProcess: false,
      },
    );
  });

  test('return valid presentation when no routes defined', (done) => {
    const container = {
      nodos: () => Promise.resolve({
        router: { routes: [] },
        close: jest.fn(),
        commandBuilders: [commandBuilders.routesCommand],
      }),
      print: (output) => { expect(output).toMatchSnapshot(); },
    };
    cli(
      ['routes'],
      {
        container, done, projectRoot, exitProcess: false,
      },
    );
  });
});

// FIXME: нужно перенести этот тест в пакет nodos-db, но cli.js находится здесь. Пока не понятно как построить архитектуру. Debatable.
// test('nodos/cli/db', (done) => {
//   const replServer = { context: {} };
//   const container = {
//     repl: {
//       start: () => replServer,
//     },
//   };
//   cli(
//     ['db'],
//     {
//       container, done, projectRoot, exitProcess: false,
//     },
//   );

//   // expect(replServer.context).toHaveProperty('app');
// });
