// import '@babel/register';
// import _ from 'lodash';
import path from 'path';
import fastify from 'fastify';
import fastifySensible from 'fastify-sensible';
import pointOfView from 'point-of-view';
import pug from 'pug';
// import debug from 'debug';
import Response from '../http/Response';
import log from '../logger';

const fetchMiddleware = async (app, middlewareName) => {
  const middleware = await import(path.join(app.config.paths.middlewares, middlewareName))
    .catch(() => import(path.join(__dirname, '..', 'middlewares', middlewareName)))
    .catch(() => import(middlewareName))
    .catch(() => {
      throw new Error(`Middleware '${middlewareName}' is absent.`);
    });
  return middleware.default;
};

const sendResponse = (response, reply) => {
  log(response);
  Object.keys(response.headers).forEach((name) => {
    reply.header(name, response.headers[name]);
  });

  switch (response.responseType) {
    case 'code':
      return reply.code(response.code).send();
    case 'rendering':
      return reply.view(response.template(), response.locals);
    case 'redirect':
      return reply.code(response.code).redirect(response.redirectUrl);

    default:
      throw new Error(`Unknown responseType: ${response.responseType}`);
  }
};

export default async (app) => {
  const fastifyApp = fastify({
    logger: true,
  });
  fastifyApp.register(fastifySensible);
  app.plugins.forEach(([plugin, options]) => fastifyApp.register(plugin, options));
  // FIXME: move to nodos-templates
  fastifyApp.register(pointOfView, {
    engine: { pug },
    includeViewExtension: true,
    templates: app.config.paths.templates,
  });

  fastifyApp.after(console.log);
  fastifyApp.ready(console.log);

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

  // FIXME: implement root in nodos-routing
  fastifyApp.get('/', (request, reply) => {
    request.log.info('Some info about the current request');
    reply.send({ hello: 'world' });
  });

  // console.log(router);
  const promises = app.router.routes.map(async (route) => {
    const pathToController = path.join(app.config.paths.controllers, route.resourceName);
    const middlewarePromises = route.middlewares.map(fetchMiddleware.bind(null, app));
    const middlewares = await Promise.all(middlewarePromises);
    const opts = {
      beforeHandler: middlewares,
    };
    fastifyApp[route.method](route.url, opts, async (request, reply) => {
      if (!app.config.cacheModules) {
        const appCacheKeys = Object.keys(require.cache).filter(p => !p.match(/node_modules/))
          .filter(p => p.match(/controllers/));
        appCacheKeys.forEach((item) => { delete require.cache[item]; });
      }
      const controllers = await import(pathToController);
      const response = new Response({ templateDir: route.resourceName, templateName: route.name });
      await controllers[route.name](request, response, app.container);
      return sendResponse(response, reply);
    });
  });
  await Promise.all(promises);

  return fastifyApp;
};
