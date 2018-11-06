/* eslint-disable no-param-reassign */

import hmr from 'fastify-webpack-hmr';
import webpack from 'webpack';

import webpackConfig from '../../webpack.config';

const compiler = webpack(webpackConfig);

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
  config.addPlugin(hmr, { compiler });
};
