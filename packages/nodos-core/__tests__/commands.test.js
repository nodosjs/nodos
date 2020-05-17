const path = require('path');
const { bin } = require('../index.js');
const commandBuilders = require('../lib/commands.js');

const projectRoot = path.join(__dirname, '../__fixtures__/app');

// test('nodos/bin/console', async () => {
//   const replServer = { context: {} };
//   const container = {
//     repl: {
//       start: () => replServer,
//     },
//   };
//   const app = await bin(
//     projectRoot,
//     ['console'],
//     {
//       container,
//     },
//   );
//   await app.stop();

//   // expect(replServer.context).toHaveProperty('app');
// });

test('nodos/bin/server', async () => {
  const fillResult = (port, address, cb) => {
    cb();
  };
  const container = {
    nodos: () => ({
      start: jest.fn(),
      stop: jest.fn(),
      listen: fillResult,
      commandBuilders: [commandBuilders.serverCommandBuilder],
    }),
  };
  const app = await bin(
    projectRoot,
    ['server'],
    {
      container,
    },
  );
  await app.stop();
  expect(true).toBe(true);
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
    await app.stop();
  });

  test('return valid presentation when no routes defined', async () => {
    const container = {
      nodos: () => Promise.resolve({
        start: jest.fn(),
        stop: jest.fn(),
        router: { routes: [] },
        commandBuilders: [commandBuilders.routesCommandBuilder],
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
    await app.stop();
  });
});
