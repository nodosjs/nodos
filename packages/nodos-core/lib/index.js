// import '@babel/register';
import _ from 'lodash';
import path from 'path';
import cli from './cli';
import log from './logger';
import * as localCommands from './commands';

const nodos = async (projectRoot, env = process.env.NODOS_ENV || 'development') => {
  const appPath = path.join(projectRoot, 'config', 'environments', `${_.capitalize(env)}.js`);
  log('!!!!!!!');
  log(appPath);
  const appModule = await import(appPath);
  log(appModule);
  const app = new appModule.default(projectRoot, env);
  Object.values(localCommands).forEach(app.addCommand);
  return app;
};

export { cli, nodos };
