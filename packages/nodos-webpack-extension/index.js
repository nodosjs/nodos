const path = require('path');
// const fastifyWebpackHMR = require('fastify-webpack-hmr');
const webpack = require('webpack');
const fastifyWebpackHMR = require('./plugin.js');

module.exports = (app) => {
  const webpackConfigPath = path.join(app.config.paths.configPath, 'webpack/development.js');
  const webpackConfig = require(webpackConfigPath).default; // eslint-disable-line
  // We are using our own compiler instead of passing webpack config
  // since current fastify-webpack-hmr does not support webpack v5
  const compiler = webpack(webpackConfig);

  app.fastify.register(fastifyWebpackHMR, { compiler });
};
