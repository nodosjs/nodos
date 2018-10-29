import _ from 'lodash';
import repl from 'repl';
import columnify from 'columnify';
import { nodos } from '.';
// import buildRoutes from './routes';

// export default (projectRoot, gulp) => {
//   gulp.task('default', (done) => {
//     console.log('hello from The Nodos!');
//     done();
//   });
//   gulp.task('server', async () => {
//     const app = await nodos(projectRoot);
//     app.listen(3000, () => {
//     });
//   });

//   gulp.task('routes', async () => {
//     const router = buildRoutes(projectRoot);
//     router.routes.forEach((route) => {
//       console.log(route.name, route.method);
//     });
//   });
// };

export default (container, done) => [
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
    handler: async (argv) => {
      const nodosItem = _.get(container, 'nodos', nodos);
      const app = await nodosItem(argv.projectRoot);
      app.listen(3000, () => {
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
            columns: ['method', 'url', 'middlewares'],
            config: {
              method: {
                headingTransform: () => 'Verb',
                dataTransform: _.toUpper,
              },
              url: {
                headingTransform: () => 'URI Pattern',
              },
              middlewares: {
                headingTransform: () => 'Middlewares',
                dataTransform: names => `[ ${names} ]`,
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
