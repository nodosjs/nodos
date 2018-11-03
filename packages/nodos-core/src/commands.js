import _ from 'lodash';
import repl from 'repl';
import columnify from 'columnify';
import { nodos } from '.';

export default (container, done) => [
  {
    command: 'db',
    describe: 'run db subcommands',
    builder: {},
    handler: async (argv) => {
      const replItem = _.get(container, 'repl', repl);
      const nodosItem = _.get(container, 'nodos', nodos);
      const replServer = replItem.start({
        prompt: '> ',
      });
      const app = nodosItem(argv.projectRoot);
      replServer.context.app = app;
      done();
    },
  },
  {
    command: 'console',
    describe: 'run console',
    builder: {},
    handler: async (argv) => {
      const replItem = _.get(container, 'repl', repl);
      const nodosItem = _.get(container, 'nodos', nodos);
      const replServer = replItem.start({
        prompt: '> ',
      });
      const app = nodosItem(argv.projectRoot);
      replServer.context.app = app;
      done();
    },
  },
  {
    command: 'server',
    describe: 'run server',
    builder: yargs => yargs
      .default('h', '127.0.0.1')
      .alias('h', 'host')
      .default('p', 3000)
      .alias('p', 'port'),
    handler: async (argv) => {
      const nodosItem = _.get(container, 'nodos', nodos);
      const app = await nodosItem(argv.projectRoot);
      app.listen(argv.port, argv.host, (err, address) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.log(address);
        done();
      });
    },
  },
  {
    command: 'routes',
    describe: 'display routes',
    handler: async (argv) => {
      const nodosItem = _.get(container, 'nodos', nodos);
      const print = _.get(container, 'print', console.log);
      const { router: { routes } } = await nodosItem(argv.projectRoot);
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
      done();
    },
  },
];
