import hmr from 'fastify-webpack-hmr';
import webpack from 'webpack';

import webpackConfig from '../../webpack.config';

const compiler = webpack(webpackConfig);

export default (app) => {
  app.addPlugin(hmr, { compiler });
  app.config.logLevel = 'debug';
  app.config.cacheModules = false;
  app.config.db = {
    type: 'sqljs',
    synchronize: true,
    logging: true,
    // database: 'db/development.sqlite3',
    entities: [
      `${__dirname}/../../app/entities/*.js`,
    ],
  };
};
