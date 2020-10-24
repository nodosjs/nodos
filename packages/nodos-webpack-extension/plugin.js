/* eslint-disable */

const fp = require('fastify-plugin');
const { join } = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

async function fastifyWebpack(instance, opts) {
  if (instance.hasDecorator('webpack')) throw new Error('[fastify-weback-hmr]: fastify.webpack has registered already.');

  let {
    compiler, config, webpackDev = {}, webpackHot = {},
  } = opts;

  if (!compiler) {
    if (typeof config !== 'object' && !Array.isArray(config)) {
      const path = config || join(__dirname, 'webpack.config.js');
      config = require(path);
    }

    compiler = webpack(config);
  }

  if (!webpackDev.publicPath) {
    if (~Object.keys(compiler).indexOf('compilers')) {
      throw new Error('[fastify-webpack-hmr]: You must specify webpackDev.publicPath option in multi compiler mode.');
    }

    const { publicPath } = compiler.options.output;

    if (!publicPath) {
      throw new Error('[fastify-webpack-hmr]: publicPath must be set on `dev` options, or in a compiler\'s `output` configuration.');
    }
    webpackDev.publicPath = publicPath;
  }

  await instance.register(require('middie'));

  instance
    .addHook('onReady', (next) => {
      const dev = webpackDevMiddleware(compiler, webpackDev);
      instance.use(dev);

      let hot = null;
      if (webpackHot) {
        hot = webpackHotMiddleware(compiler, webpackHot);
        instance.use(hot);
      }

      instance.decorate('webpack', {
        compiler,
        dev,
        hot,
      });
      next();
    })
    .addHook('onClose', (instance, next) => {
      instance.webpack.dev.close(() => next);
    });
}

module.exports = fp(fastifyWebpack, {
  fastify: '>=3.x',
  name: 'fastify-webpack',
});
