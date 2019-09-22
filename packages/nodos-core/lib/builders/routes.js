import yml from 'js-yaml';
// import debug from 'debug';
import { promises as fs } from 'fs';
import Router from '@nodosjs/routing';

// const log = debug('nodos');

export default async (routesPath, { host }) => {
  const rawData = await fs.readFile(routesPath);
  const routesMap = yml.safeLoad(rawData);
  return new Router(routesMap, { host });
};
