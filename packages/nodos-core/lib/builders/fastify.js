const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const fastify = require('fastify');
const fastifySensible = require('fastify-sensible');
const pointOfView = require('point-of-view');
const pug = require('pug');
// const debug = require('debug');
const Response = require('../http/Response');
const log = require('../logger');

const fetchMiddleware = async (app, middlewareName) => {
  const paths = [
    path.join(app.config.paths.middlewares, middlewareName),
    path.join(__dirname, '..', 'middlewares', middlewareName),
    path.resolve(middlewareName)
  ];

  const promises = paths.map(async (p) => {
    try {
      await fs.promises.stat(`${p}.js`);
      return p;
    } catch (e) {
      return null;
    }
  });
  const filepaths = await Promise.all(promises)
  const filepath = filepaths.find(_.identity);

  if (!filepath) {
    throw new Error(`Cannot find middleware: ${middlewareName}. Paths: ${paths.join(', ')}`);
  }

  return require(filepath);
};

const sendResponse = async (fastifyApp, response, reply) => {
  log('response', response);
  Object.keys(response.headers).forEach((name) => {
    reply.header(name, response.headers[name]);
  });

  switch (response.responseType) {
    case 'code':
      return reply.code(response.code).send();
    case 'rendering':
      const pathToTemplate = response.template();
      log('template', pathToTemplate);
      const body = await fastifyApp.view(pathToTemplate, response.locals);
      return reply.code(response.code)
        .header('Content-Type', 'text/html; charset=utf-8')
        .send(body);
    case 'redirect':
      return reply.code(response.code).redirect(response.redirectUrl);

    default:
      throw new Error(`Unknown responseType: ${response.responseType}`);
  }
};

module.exports = async (app) => {
  const fastifyApp = fastify({
    logger: true,
  });
  // throw 'asdf';
  fastifyApp.register(fastifySensible, { errorHandler: app.config.errorHandler });
  // FIXME: move to nodos-templates
  fastifyApp.register(pointOfView, {
    engine: { pug },
    includeViewExtension: true,
    templates: app.config.paths.templates,
  });
  app.plugins.forEach(([plugin, options]) => fastifyApp.register(plugin, options));

  // fastifyApp.after(console.log);
  // fastifyApp.ready(console.log);

  // // console.log(router.scopes);
  // const scopePromises = router.scopes.map(async (scope) => {
  //   const promises = scope.middlewares.map(name => fetchMiddleware(config, name));
  //   const middlewares = await Promise.all(promises);
  //   // console.log(middlewares);
  //   middlewares.forEach((middleware) => {
  //     console.log(scope, middlewares);
  //     app.register(middleware, { prefix: scope.path });
  //   });
  // });
  // await Promise.all(scopePromises);

  // FIXME: enable only if option specified
  // fastifyApp.setErrorHandler((error, request, reply) => {
  //   throw error;
  // });

  const promises = app.router.routes.map(async (route) => {
    const pathToController = path.join(app.config.paths.controllers, route.resourceName);
    const middlewarePromises = route.middlewares.map((middleware) => fetchMiddleware(app, middleware));
    const middlewares = await Promise.all(middlewarePromises);
    console.log('!!!', middlewares);

    const handler = async (request, reply) => {
      if (!app.config.cacheModules) {
        const appCacheKeys = Object.keys(require.cache).filter(p => !p.match(/node_modules/))
          .filter(p => p.match(/controllers/));
        appCacheKeys.forEach((item) => { delete require.cache[item]; });
      }
      log(pathToController);
      const actions = require(pathToController);
      const response = new Response({ templateDir: route.resourceName, templateName: route.actionName });
      log('actions', [actions, route.actionName]);
      if (!_.has(actions, route.actionName)) {
        throw new Error(`Unknown action name: ${route.actionName}. Route: ${route}`);
      }
      await actions[route.actionName](request, response, app.container);
      return sendResponse(fastifyApp, response, reply);
    };

    const opts = {
      handler,
      url: route.url,
      method: route.method.toUpperCase(),
      preHandler: middlewares,
    };
    fastifyApp.route(opts);
  });
  await Promise.all(promises);

  return fastifyApp;
};
