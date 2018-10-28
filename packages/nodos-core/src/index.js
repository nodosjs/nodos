import path from 'path';
import fastify from 'fastify';
import fastifyErrorPage from 'fastify-error-page';
// import fastifySensible from 'fastify-sensible';
import pointOfView from 'point-of-view';
import marko from 'marko';
// import debug from 'debug';
import buildRouter from './routes';
import binNodos from './binNodos';
import binTest from './binTest';
import Application from './Application';

const nodosEnv = process.env.NODOS_ENV || 'development';
// const log = debug('nodos');

const bin = { nodos: binNodos, test: binTest };
export { bin };

const fetchMiddleware = async (config, middlewareName) => {
  const middleware = await import(path.join(config.paths.middlewares, middlewareName))
    .catch(() => import(path.join(__dirname, 'middlewares', middlewareName)))
    .catch(() => import(middlewareName))
    .catch(() => {
      throw new Error(`Middleware '${middlewareName}' is absent.`);
    });
  return middleware.default;
};

const buildFastify = async (config, router) => {
  const app = fastify({
    logger: true,
  });
  // app.register(fastifySensible);
  if (nodosEnv === 'development') {
    app.register(fastifyErrorPage);
  }
  app.register(pointOfView, {
    engine: { marko },
    includeViewExtension: true,
    templates: config.paths.templates,
  });

  app.get('/', (request, reply) => {
    request.log.info('Some info about the current request');
    reply.send({ hello: 'world' });
  });

  // console.log(router);
  const promises = router.routes.map(async (route) => {
    const pathToHandler = path.join(config.paths.handlers, route.path, route.resourceName);
    const middlewaresPromises = route.middlewares.map(fetchMiddleware.bind(null, config));
    const middlewares = await Promise.all(middlewaresPromises);
    const opts = {
      beforeHandler: middlewares,
    };

    route.actions.forEach((action) => {
      app[action.method](action.url, opts, async (request, reply) => {
        // decache(pathToHandler);
        // FIXME: implement reloading on request
        const handlers = await import(pathToHandler);
        const locals = handlers[action.name](request, reply);
        const pathToView = path.join(route.path, route.resourceName, action.name);
        reply.view(pathToView, locals);
      });
    });
  });
  await promises;

  return app;
};

const buildConfig = async (projectRootPath) => {
  const join = path.join.bind(null, projectRootPath);
  const config = {
    paths: {
      routes: join('config', 'routes.yml'),
      application: join('config', 'application'),
      config: join('config'),
      environments: join('config/environments'),
      templates: join('app', 'templates'),
      handlers: join('app', 'handlers'),
      middlewares: join('app', 'middlewares'),
    },
  };

  const configureForApp = await import(config.paths.application);
  const pathToConfigForCurrentStage = path.join(config.paths.environments, `${nodosEnv}.js`);
  const configureForStage = await import(pathToConfigForCurrentStage);
  // FIXME: remove default
  configureForApp.default(config);
  configureForStage.default(config);
  return config;
};

export const nodos = async (projectRootPath) => {
  const config = await buildConfig(projectRootPath);
  const router = await buildRouter(config);
  const app = await buildFastify(config, router);
  return new Application(app);
};
