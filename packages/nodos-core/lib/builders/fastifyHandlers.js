// @ts-check

/** @typedef { import('../Application') } Application */

const _ = require('lodash');
const path = require('path');
// const debug = require('debug');
const Response = require('../http/Response.js');
const Request = require('../http/Request.js');
const log = require('../logger.js');

const fetchMiddleware = async (app, middlewareName) => {
  const filepath = app.middlewares[middlewareName];
  if (!filepath) {
    const middlewareNames = Object.keys(app.middlewares).join(', ');
    throw new Error(`Cannot find middleware: ${middlewareName}. Middlewares: ${middlewareNames}`);
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
        throw new Error(html.toString());
        // reply.code(500)
        //   .type('text/html')
        //   .send(html.toString());
        // return reply;
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

const isProtectedFromForgery = (route) => route.middlewares.includes('protectFromForgery');

const csrfChecker = (fastifyInstance, route) => (request, response, done) => {
  if (isProtectedFromForgery(route) && request.method !== 'GET') {
    fastifyInstance.csrfProtection(request, response, done);
  } else {
    done();
  }
};

/**
 * Builds fastify app
 *
 * @param {Application} app
 */
module.exports = async (app) => {
  const promises = app.router.routes.map(async (route) => {
    const pathToController = path.join(app.config.paths.controllersPath, route.controllerPath);
    const handler = async (fastifyRequest, reply) => {
      if (!app.config.cacheModules) {
        const appCacheKeys = Object.keys(require.cache).filter((p) => !p.match(/node_modules/))
          .filter((p) => p.match(/controllers/));
        appCacheKeys.forEach((item) => { delete require.cache[item]; });
      }
      log(pathToController);
      const actions = require(pathToController); // eslint-disable-line
      const response = new Response(reply, { templateDir: route.controllerPath, templateName: route.actionName });
      const request = new Request(fastifyRequest);
      log('actions', [actions, route.actionName]);
      if (!_.has(actions, route.actionName)) {
        throw new Error(`Unknown action name: ${route.actionName}. Route: ${JSON.stringify(route)}`);
      }

      // TODO read all middlewares before mapping routes (only for production)
      const middlewarePromises = route.middlewares.map((middleware) => fetchMiddleware(app, middleware));
      const middlewares = await Promise.all(middlewarePromises);

      const currentAction = actions[route.actionName];
      const actionWithMiddlewares = middlewares
        .reduce((acc, middleware) => {
          const wrappedAction = (...args) => middleware(() => acc(request, response, app), ...args);
          return wrappedAction;
        }, currentAction);
      await actionWithMiddlewares(request, response, app);
      await sendResponse(app.fastify, response, reply);
      return reply;
    };

    const opts = {
      handler,
      url: route.template,
      method: route.method.toUpperCase(),
      preHandler: csrfChecker(app.fastify, route),
    };

    log(opts);
    app.fastify.route(opts);
  });

  return Promise.all(promises);
};
