const path = require('path');
const fastifyWebpackHMR = require('fastify-webpack-hmr');

module.exports = (app) => {
  const hook = () => {
    if (app.isDevelopment()) {
      const webpackConfigPath = path.join(app.config.paths.configPath, 'webpack/development.js');
      const webpackConfig = require(webpackConfigPath).default; // eslint-disable-line

      app.addPlugin(fastifyWebpackHMR, { config: webpackConfig });
    }
  };
  app.addHook('onListen', hook);
};
