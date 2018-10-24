import path from 'path';
import fastify from 'fastify';
import fastifyErrorPage from 'fastify-error-page';
// import fastifySensible from 'fastify-sensible';
import pointOfView from 'point-of-view';
import marko from 'marko';
import debug from 'debug';
import buildRouter from './routes';
import tasks from './tasks';
import Application from './Application';

const nodosEnv = process.env.NODOS_ENV || 'development';
const log = debug('nodos');

export { tasks };

const buildFastify = (projectRootPath, router) => {
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
    templates: path.join(projectRootPath, 'app', 'views'),
  });

  app.get('/', (request, reply) => {
    request.log.info('Some info about the current request');
    reply.send({ hello: 'world' });
  });

  // FIXME: add middlewares
  // console.log(router);
  router.routes.forEach((route) => {
    const pathToHandler = path.join(projectRootPath, 'app', 'handlers', route.resourceName);
    const pathToView = path.join(route.resourceName, route.name);
    app[route.method](route.url, async (request, reply) => {
      // decache(pathToHandler);
      // FIXME: implement reloading on request
      const handlers = await import(pathToHandler);
      const locals = handlers[route.name](request, reply);
      reply.view(pathToView, locals);
    });
  });

  return app;
};

const buildConfig = async (projectRootPath) => {
  const config = {
  };

  const pathToAppConfig = path.join(projectRootPath, 'config', 'application.js');
  log(pathToAppConfig);
  const configureForApp = await import(pathToAppConfig);
  const pathToConfigForCurrentStage = path.join(projectRootPath, 'config', 'environments', `${nodosEnv}.js`);
  const configureForStage = await import(pathToConfigForCurrentStage);
  // FIXME: remove default
  configureForApp.default(config);
  configureForStage.default(config);
  return config;
};

export const nodos = async (projectRootPath) => {
  await buildConfig(projectRootPath);
  const router = await buildRouter(projectRootPath);
  const app = buildFastify(projectRootPath, router);
  return new Application(app);
};
