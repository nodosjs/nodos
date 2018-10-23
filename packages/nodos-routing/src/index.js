import { promises as fs } from 'fs';
import yml from 'js-yaml';
import Router from './Router';

export default async (routesFilePath, middlewares) => {
  const rawData = await fs.readFile(routesFilePath);
  const routes = yml.safeLoad(rawData);
  return new Router(routes, middlewares);
};
