import { nodos } from '.';
import buildRoutes from './routes';

module.exports = (projectRoot, gulp) => {
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
};
