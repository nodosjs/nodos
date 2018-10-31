import path from 'path';
import fastify from 'fastify';
import fastifyErrorPage from 'fastify-error-page';
// import fastifySensible from 'fastify-sensible';
import pointOfView from 'point-of-view';
import pug from 'pug';
// import debug from 'debug';
import buildRouter from './routes';
import binNodos from './binNodos';
import binTest from './binTest';
import Application from './Application';
import Response from './http/Response';
import log from './logger';

const nodosEnv = process.env.NODOS_ENV || 'development';


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

const sendResponse = (response, reply) => {
  log(response);
  Object.keys(response.headers).forEach((name) => {
    reply.header(name, response.headers[name]);
  });

  switch (response.responseType) {
    case 'code':
      reply.code(response.code).send();
      break;
    case 'rendering':
      reply.view(response.template(), response.locals);
      break;
    case 'redirect':
      reply.code(response.code).redirect(response.redirectUrl);
      break;

    default:
      throw new Error(`Unknown responseType: ${response.responseType}`);
  }
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
    engine: { pug },
    includeViewExtension: true,
    templates: config.paths.templates,
  });

  app.get('/', (request, reply) => {
    request.log.info('Some info about the current request');
    reply.send({ hello: 'world' });
  });

  // console.log(router);
  const promises = router.routes.map(async (route) => {
    const pathToHandler = path.join(config.paths.handlers, route.resourceName);
    const middlewaresPromises = route.middlewares.map(fetchMiddleware.bind(null, config));
    const middlewares = await Promise.all(middlewaresPromises);
    const opts = {
      beforeHandler: middlewares,
    };
    app[route.method](route.url, opts, async (request, reply) => {
      // FIXME: enable only for development environment
      // FIXME: enable only for handlers and they deps
      Object.keys(require.cache).forEach((item) => { delete require.cache[item]; });
      const handlers = await import(pathToHandler);
      const response = new Response({ templateDir: route.resourceName, templateName: route.name });
      await handlers[route.name](request, response);
      sendResponse(response, reply);
    });
  });
  await Promise.all(promises);

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
  const fstf = await buildFastify(config, router);
  return new Application({ config, fastify: fstf, router });
};
