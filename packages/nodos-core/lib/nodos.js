import _ from 'lodash';
import path from 'path';
import * as localCommands from './commands';
import log from './logger';

export default async (projectRoot, env = process.env.NODOS_ENV || 'development') => {
  const appPath = path.join(projectRoot, 'config', 'environments', `${_.capitalize(env)}.js`);
  log(appPath);
  const appModule = await import(appPath);
  log(appModule);
  const app = new appModule.default(projectRoot, env);
  Object.values(localCommands).forEach(app.addCommand);
  return app;
};
