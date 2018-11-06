/* eslint-disable no-param-reassign */

export default (config) => {
  config.cacheModules = false;
  config.logLevel = 'debug';
  config.db = {
    type: 'sqlite',
    synchronize: true,
    logging: true,
    database: 'db/development.sqlite3',
    entities: [
      `${__dirname}/../../app/entities/*.js`,
    ],
  };
};
