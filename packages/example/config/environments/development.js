import hmr from 'fastify-webpack-hmr';
import webpack from 'webpack';

import webpackConfig from '../../webpack.config.js';

const compiler = webpack(webpackConfig);

export default (app) => {
  app.addPlugin(hmr, { compiler });
  app.config.logLevel = 'debug';
  app.config.cacheModules = false;
};
