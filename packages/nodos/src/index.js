import path from 'path';
import { promises as fs } from 'fs';
import fastify from 'fastify';
import tasks from './tasks';

const nodosEnv = process.env.NODOS_ENV || 'development';

export { tasks };

export const nodos = async (projectRootPath) => {
  const config = await buildConfig(projectRootPath);
  return fastify();
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

