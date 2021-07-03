export default async (app) => {
  app.config.logLevel = 'debug';
  app.config.errorHandler = true;
  app.config.cacheModules = true;
  app.config.host = 'http://example.com';
  app.config.csrf = { enabled: false }
  // this.config.db = {
  //   type: 'sqlite',
  //   synchronize: true,
  //   logging: true,
  //   database: 'db/test.sqlite3',
  //   entities: [
  //     `${__dirname}/../../app/entities/*.js`,
  //   ],
  // };
};
