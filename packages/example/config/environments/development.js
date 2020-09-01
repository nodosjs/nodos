import path from 'path';

export default async (app) => {
  app.config.logLevel = 'debug';
  app.config.cacheModules = false;
  app.config.db = {
    client: 'sqlite3',
    connection: 'db/development.sqlite3',
  };
};
