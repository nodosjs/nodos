const path = require('path');
// fastify-method-override is ES6 module, that's why we need to require 'default'
const fastifyMethodOverride = require('fastify-method-override').default;
const fastifyCSRF = require('fastify-csrf');
const pointOfView = require('point-of-view');
const fastifyErrorPage = require('fastify-error-page');
const fastifySecureSession = require('fastify-secure-session');
const fastifyFlash = require('fastify-flash');
const pug = require('pug');
const fastifyFormbody = require('fastify-formbody');
const qs = require('qs');

module.exports = async (app) => {
  const { buildPath, buildUrl } = app.router;

  app.addPlugin(fastifySecureSession, {
    secret: 'a secret with minimum length of 32 characters',
    cookie: { path: '/' },
  });
  app.addPlugin(fastifyFlash);

  // TODO: check https://github.com/fastify/fastify-multipart
  app.addPlugin(fastifyFormbody, { parser: (s) => qs.parse(s) });
  app.addPlugin(fastifyMethodOverride);
  app.addPlugin(pointOfView, {
    engine: { pug },
    includeViewExtension: true,
    root: app.config.paths.templatesPath,
    options: {
      basedir: app.config.paths.templatesPath,
      debug: false,
      cache: app.config.cacheModules,
    },
    defaultContext: {
      buildPath: buildPath.bind(app.router),
      buildUrl: buildUrl.bind(app.router),
    },
  });

  if (app.isDevelopment()) {
    app.addPlugin(fastifyErrorPage);
  }

  const defaultCsrfConfig = { enabled: true, cookie: true };
  app.setDefaultConfig('csrf', defaultCsrfConfig);
  // app.addPlugin(fastifyCSRF, app.config.csrf);

  if (app.config.csrf.enabled) {
    app.addPlugin(fastifyCSRF, app.config.csrf);
  }

  // app.addMiddleware(path.resolve(__dirname, './lib/middlewares/protectFromForgery.js'));
  app.addMiddleware(path.resolve(__dirname, './lib/middlewares/fetchFlash.js'));
};
