import repl from 'repl';
import { nodos } from '.';
import buildRoutes from './routes';

export default (projectRoot, gulp) => {
  gulp.task('default', (done) => {
    console.log('hello from The Nodos!');
    done();
  });
  gulp.task('server', async () => {
    const app = await nodos(projectRoot);
    app.listen(3000, () => {
    });
  });

  gulp.task('routes', async () => {
    const router = buildRoutes(projectRoot);
    router.routes.forEach((route) => {
      console.log(route.name, route.method);
    });
  });

  gulp.task('console', async () => {
    const replServer = repl.start({
      prompt: '> ',
    });

    const app = await nodos(projectRoot);
    replServer.context.app = app;
  });
};
