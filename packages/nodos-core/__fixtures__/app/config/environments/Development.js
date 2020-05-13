export default (app) => {
  app.config.logLevel = 'debug';
  app.config.errorHandler = false;
  app.config.cacheModules = false;
  app.config.host = 'http://example.com';
  // this.config.db = {
  //   type: 'sqlite',
  //   synchronize: true,
  //   logging: true,
  //   database: 'db/test.sqlite3',
  //   entities: [
  //     `${__dirname}/../../app/entities/*.js`,
  //   ],
  // };
}
