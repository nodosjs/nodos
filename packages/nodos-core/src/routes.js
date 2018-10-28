import yml from 'js-yaml';
// import debug from 'debug';
import { promises as fs } from 'fs';
import Router from '@nodosjs/routing';

// const log = debug('nodos');

export default async (config) => {
  const rawData = await fs.readFile(config.paths.routes);
  const routesMap = yml.safeLoad(rawData);
  return new Router(routesMap);
};
