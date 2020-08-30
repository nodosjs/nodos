const path = require('path');
const fastifyWebpackHMR = require('fastify-webpack-hmr');

module.exports = async (app) => {
  if (app.isDevelopment()) {
    const webpackConfigPath = path.join(app.config.paths.configPath, 'webpack/development.js');
    const webpackConfig = require(webpackConfigPath); // eslint-disable-line

    app.addPlugin(fastifyWebpackHMR, { config: webpackConfig });
  }
};
