// @ts-check

const _ = require('lodash');
const path = require('path');
const fastify = require('fastify');
const fastifySensible = require('fastify-sensible');
const fastifyStatic = require('fastify-static');
const fastifyExpress = require('fastify-express');
const fastifyCookie = require('fastify-cookie');
const fastifyFormbody = require('fastify-formbody');
// fastify-method-override is ES6 module, that's why we need to require 'default'
const fastifyMethodOverride = require('fastify-method-override').default;
const fastifySession = require('fastify-session');
const pointOfView = require('point-of-view');
const pug = require('pug');
// const debug = require('debug');
const Response = require('../http/Response');
const log = require('../logger');

const fetchMiddleware = async (app, middlewareName) => {
  const filepath = app.middlewares[middlewareName];
  if (!filepath) {
    throw new Error(`Cannot find middleware: ${middlewareName}. Middlewares: ${app.middlewares.join(', ')}`);
  }

  const module = require(filepath); // eslint-disable-line
  if (!app.config.cacheModules) {
    delete require.cache[filepath];
  }
  return module.default ? module.default : module;
};

const sendResponse = async (fastifyApp, response, reply) => {
  log('response', response);
  Object.keys(response.headers).forEach((name) => {
    reply.header(name, response.headers[name]);
  });

  switch (response.responseType) {
    case 'code':
      reply.code(response.code).send(response.body);
      return reply;
    case 'sending':
      reply.send(response.body);
      return reply;
    case 'rendering': {
      const pathToTemplate = response.template();
      log('template', pathToTemplate);
      const html = await fastifyApp.view(pathToTemplate, response.locals);
      // TODO point-of-view send errors as a normal html
      if (_.isObject(html)) {
        reply.code(500)
          .type('text/html')
          .send(html.toString());
        return reply;
      }
      reply.code(response.code)
        .type('text/html')
        .send(html);
      return reply;
    }
    case 'redirect':
      reply.redirect(response.code, response.redirectUrl);
      return reply;

    default:
      throw new Error(`Unknown responseType: ${response.responseType}`);
  }
};

module.exports = async (app) => {
  const fastifyApp = fastify({ logger: true });

  const { buildPath, buildUrl } = app.router;
  // throw 'asdf';

  await fastifyApp.register(fastifyExpress);
  await fastifyApp.register(fastifySensible, { errorHandler: app.config.errorHandler });
  // FIXME: move to nodos-templates
  await fastifyApp.register(pointOfView, {
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
  await fastifyApp.register(fastifyStatic, {
    root: app.config.paths.publicPath,
    // prefix: '/public/', // optional: default '/'
  });
  await fastifyApp.register(fastifyCookie);
  await fastifyApp.register(fastifyFormbody);
  await fastifyApp.register(fastifyMethodOverride);
  await fastifyApp.register(fastifySession, {
    cookieName: 'sessionId',
    secret: 'a secret with minimum length of 32 characters',
    cookie: { secure: false },
    expires: 1800000,
  });

  const pluginPromises = app.plugins.map(([plugin, options]) => fastifyApp.register(plugin, options));
  await Promise.all(pluginPromises);

  const promises = app.router.routes.map(async (route) => {
    const pathToController = path.join(app.config.paths.controllersPath, route.resourceName);
    const handler = async (request, reply) => {
      if (!app.config.cacheModules) {
        const appCacheKeys = Object.keys(require.cache).filter((p) => !p.match(/node_modules/))
          .filter((p) => p.match(/controllers/));
        appCacheKeys.forEach((item) => { delete require.cache[item]; });
      }
      log(pathToController);
      const actions = require(pathToController); // eslint-disable-line
      const response = new Response({ templateDir: route.resourceName, templateName: route.actionName });
      log('actions', [actions, route.actionName]);
      if (!_.has(actions, route.actionName)) {
        throw new Error(`Unknown action name: ${route.actionName}. Route: ${route}`);
      }

      // TODO read all middlewares before mapping routes (only for production)
      const middlewarePromises = route.middlewares.map((middleware) => fetchMiddleware(app, middleware));
      const middlewares = await Promise.all(middlewarePromises);

      // FIXME: wrap fastify's request with nodos request
      const currentAction = actions[route.actionName];
      const actionWithMiddlewares = middlewares
        .reduce((acc, middleware) => {
          const wrappedAction = (...args) => middleware(() => acc(request, response, app), ...args);
          return wrappedAction;
        }, currentAction);
      await actionWithMiddlewares(request, response, app);
      await sendResponse(fastifyApp, response, reply);
      return reply;
    };

    const opts = {
      handler,
      url: route.url,
      method: route.method.toUpperCase(),
      // preHandler: middlewares,
    };
    fastifyApp.route(opts);
  });
  await Promise.all(promises);
  // without calling ready() method fastify app instance keeps to be thenable object
  // in this state instance will have bounded then method which returns only undefined
  // when you call builder with thenable instance you will always get undefined
  await fastifyApp.ready();

  return fastifyApp;
};
