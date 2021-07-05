// import path from 'path';
import nodosWebpack from '@nodosjs/webpack-extension';

export default async (app) => {
  app.addExtension(nodosWebpack);

  app.config.errorHandler = false;
  app.config.logLevel = 'debug';
  app.config.cacheModules = false;
  app.config.csrf = { enabled: true }
  app.config.db = {
    type: 'sqlite',
    database: 'db/development.sqlite',
  };
};
