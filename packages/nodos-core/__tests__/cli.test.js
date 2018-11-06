import path from 'path';
import { cli } from '../lib';
import * as commands from '../lib/commands';

const projectRoot = path.join(__dirname, '__fixtures__/app');

// FIXME: Несмотря на то что хандлеры поддерживают асинки, сам вызов yargs (через наш cli) нельзя вызвать через async. Это приводит к тому что приходится прокидывать `done` и явно вызывать его внутри. Соответственно если хандлер асинхронный, то невозможно выполнить expect. Надо найти способ вызывать yargs через async, тогда все сильно упроститься в том числе интерфейсы взаимодействия с командами.

test('nodos/cli/console', async (done) => {
  const replServer = { context: {} };
  const container = {
    repl: {
      start: () => replServer,
    },
  };
  const app = await cli(
    ['console'],
    {
      container, done, projectRoot, exitProcess: false,
    },
  );
  await app.stop();

  // expect(replServer.context).toHaveProperty('app');
});

test('nodos/cli/test', async (done) => {
  const run = jest.fn();
  const container = {
    jest: { run },
  };
  const app = await cli(
    ['test'],
    {
      container, done, projectRoot, exitProcess: false,
    },
  );
  await app.stop();

  // expect(replServer.context).toHaveProperty('app');
});

test('nodos/cli/server', async (done) => {
  const fillResult = (port, address, cb) => {
    cb();
  };
  const container = {
    nodos: () => ({
      boot: jest.fn(),
      listen: fillResult,
      commands: [commands.serverCommand],
    }),
  };
  const app = await cli(
    ['server'],
    {
      container, done, projectRoot, exitProcess: false,
    },
  );
});

describe('nodos/cli/routes', () => {
  test('return valid routes presentation', async (done) => {
    const container = {
      print: (output) => { expect(output).toMatchSnapshot(); },
    };
    const app = await cli(
      ['routes'],
      {
        container, done, projectRoot, exitProcess: false,
      },
    );
  });

  test('return valid presentation when no routes defined', async (done) => {
    const container = {
      nodos: () => Promise.resolve({
        boot: jest.fn(),
        router: { routes: [] },
        commands: [commands.routesCommand],
      }),
      print: (output) => { expect(output).toMatchSnapshot(); },
    };
    const app = await cli(
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
