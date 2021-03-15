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
const csrfPluginWrapper = require('./lib/csrfPluginWrapper');

module.exports = async (app) => {
  const { route } = app.router;

  app.fastify.register(fastifySecureSession, {
    secret: 'a secret with minimum length of 32 characters',
    cookie: { path: '/' },
  });
  app.fastify.register(fastifyFlash);

  // TODO: check https://github.com/fastify/fastify-multipart
  app.fastify.register(fastifyFormbody, { parser: (s) => qs.parse(s) });
  app.fastify.register(fastifyMethodOverride);
  app.fastify.register(pointOfView, {
    engine: { pug },
    includeViewExtension: true,
    root: app.config.paths.templatesPath,
    options: {
      basedir: app.config.paths.templatesPath,
      debug: false,
      cache: app.config.cacheModules,
    },
    defaultContext: {
      route: route.bind(app.router),
    },
  });

  if (app.isDevelopment()) {
    app.fastify.register(fastifyErrorPage);
  }

  app.fastify.register(fastifyCSRF, { sessionPlugin: 'fastify-secure-session' });

  if (!app.isTest()) {
    app.fastify.register(csrfPluginWrapper);
  }

  app.addMiddleware(path.resolve(__dirname, './lib/middlewares/protectFromForgery.js'));
  app.addMiddleware(path.resolve(__dirname, './lib/middlewares/fetchFlash.js'));
};
