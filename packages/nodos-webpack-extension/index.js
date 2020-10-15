const path = require('path');
const fastifyWebpackHMR = require('fastify-webpack-hmr');
const webpack = require('webpack');

module.exports = (app) => {
  if (app.isDevelopment()) {
    const webpackConfigPath = path.join(app.config.paths.configPath, 'webpack/development.js');
    const webpackConfig = require(webpackConfigPath).default; // eslint-disable-line
    const compiler = webpack(webpackConfig);

    app.addPlugin(fastifyWebpackHMR, { compiler });
  }
};
