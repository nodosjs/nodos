import path from 'path';
import { promises as fs } from 'fs';
import yml from 'js-yaml';
import fastify from 'fastify';
import Router from '@nodos/routing';
import tasks from './tasks';
import Application from './Application';

const nodosEnv = process.env.NODOS_ENV || 'development';

export { tasks };

export const nodos = async (projectRootPath) => {
  const config = await buildConfig(projectRootPath);
  const router = await buildRouter(projectRootPath);
  const app = buildFastify(router);
  return new Application(app);
};

const buildConfig = async (projectRootPath) => {
  const config = {
  }

  const pathToAppConfig = path.join(projectRootPath, 'config', 'application.js');
  const configureForApp = await import(pathToAppConfig);
  const pathToConfigForCurrentStage = path.join(projectRootPath, 'config', 'environments', `${nodosEnv}.js`);
  const configureForStage = await import(pathToConfigForCurrentStage);
  // FIXME: remove default
  configureForApp.default(config);
  configureForStage.default(config);
  return config;
}

const buildRouter = async (projectRootPath) => {
  const routesFilePath = path.join(projectRootPath, 'config', 'routes.yml');
  const rawData = await fs.readFile(routesFilePath);
  const routesMap = yml.safeLoad(rawData);
  return new Router(routesMap);
};

const buildFastify = (router) => {
  const app = fastify({
    logging: true,
  });

  app.get('/', (request, reply) => {
    request.log.info('Some info about the current request')
    reply.send({ hello: 'world' });
  });

  return app;
};
