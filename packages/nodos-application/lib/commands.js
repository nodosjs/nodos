import _ from 'lodash';
import jest from 'jest';
import repl from 'repl';
import columnify from 'columnify';
import log from './logger';

export const testCommand = ({ container }) => ({
  command: 'test [file]',
  describe: 'run tests',
  builder: {},
  handler: (argv) => {
    // FIXME: not working
    process.env.NODOS_ENV = 'test';
    // const rest = argv._.slice(1);
    const options = [];
    if (argv.file) {
      options.push('-f', argv.file);
    } else {
      options.push('--testPathPattern', '/tests/');
    }
    const jestItem = _.get(container, 'jest', jest);
    log(options);
    jestItem.run(options);
  },
});

export const consoleCommand = ({ app, container }) => ({
  command: 'console',
  describe: 'run console',
  builder: {},
  handler: async () => {
    const replItem = _.get(container, 'repl', repl);
    const replServer = replItem.start({
      prompt: '> ',
    });
    replServer.context.app = app;
  },
});

export const serverCommand = ({ app }) => ({
  command: 'server',
  describe: 'run server',
  builder: yargs => yargs
    .default('h', '127.0.0.1')
    .alias('h', 'host')
    .default('p', 3000)
    .alias('p', 'port'),
  handler: async (argv) => {
    app.listen(argv.port, argv.host, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(address);
    });
  },
});

export const routesCommand = ({ app, container }) => ({
  command: 'routes',
  describe: 'display routes',
  handler: async () => {
    const print = _.get(container, 'print', console.log);
    const { routes } = app.router;
    if (_.isEmpty(routes)) {
      print(
        'You don\'t have any routes defined!\n\n'
        + 'Please add some routes in config/routes.yml.',
      );
    } else {
      const formattedRoutes = columnify(
        routes,
        {
          columns: ['method', 'url', 'pipeline'],
          config: {
            method: {
              headingTransform: () => 'Verb',
              dataTransform: _.toUpper,
            },
            url: {
              headingTransform: () => 'URI Pattern',
            },
            pipeline: {
              headingTransform: () => 'Pipeline',
            },
          },
        },
      );
      print(formattedRoutes);
    }
  },
});
