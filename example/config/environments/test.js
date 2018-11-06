/* eslint-disable no-param-reassign */

export default (config) => {
  config.logLevel = 'debug';
  config.cacheModules = true;
  config.db = {
    type: 'sqlite',
    synchronize: true,
    logging: true,
    database: 'db/test.sqlite3',
    entities: [
      `${__dirname}/../../app/entities/*.js`,
    ],
  };
};
