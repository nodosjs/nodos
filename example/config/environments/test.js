export default (app) => {
  app.config.logLevel = 'debug';
  app.config.cacheModules = true;
  app.config.db = {
    type: 'sqlite',
    synchronize: true,
    logging: true,
    database: 'db/test.sqlite3',
    entities: [
      `${__dirname}/../../app/entities/*.js`,
    ],
  };
};
