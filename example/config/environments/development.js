// import path from 'path';
import nodosWebpack from '@nodosjs/webpack-extension';

export default async (app) => {
  app.addExtension(nodosWebpack);

  app.config.host = 'localhost';
  app.config.logLevel = 'debug';
  app.config.cacheModules = false;
  app.config.csrf = { enabled: true }
  app.config.db = {
    client: 'sqlite3',
    connection: 'db/development.sqlite3',
  };
};
