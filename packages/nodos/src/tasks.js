import { nodos } from '.';

module.exports = (projectRoot, gulp) => {
  gulp.task('default', (done) => {
    console.log('hello from The Nodos!');
    done();
  });
  gulp.task('server', async () => {
    const app = await nodos(projectRoot);
    app.listen(3000);
  });
}
