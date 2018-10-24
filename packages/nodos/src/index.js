import path from 'path';
import { promises as fs } from 'fs';
import fastify from 'fastify';
import decache from 'decache';
import buildRouter from './routes';
import tasks from './tasks';
import Application from './Application';

const nodosEnv = process.env.NODOS_ENV || 'development';

export { tasks };

export const nodos = async (projectRootPath) => {
  const config = await buildConfig(projectRootPath);
  const router = await buildRouter(projectRootPath);
  const app = buildFastify(projectRootPath, router);
  return new Application(app);
};

const buildConfig = async (projectRootPath) => {
  const config = {
  };

  const pathToAppConfig = path.join(projectRootPath, 'config', 'application.js');
  const configureForApp = await import(pathToAppConfig);
  const pathToConfigForCurrentStage = path.join(projectRootPath, 'config', 'environments', `${nodosEnv}.js`);
  const configureForStage = await import(pathToConfigForCurrentStage);
  // FIXME: remove default
  configureForApp.default(config);
  configureForStage.default(config);
  return config;
};

const buildFastify = (projectRootPath, router) => {
  const app = fastify({
    logging: true,
  });

  app.get('/', (request, reply) => {
    request.log.info('Some info about the current request');
    reply.send({ hello: 'world' });
  });

  // FIXME: add middlewares
  // console.log(router);
  router.routes.forEach((route) => {
    const pathToHandler = path.join(projectRootPath, 'app', 'handlers', route.resourceName);
    app[route.method](route.url, async (request, reply) => {
      // decache(pathToHandler);
      // FIXME: implement reloading on request
      const handlers = await import(pathToHandler);
      return handlers[route.name](request, reply);
    });
  });

  return app;
};
