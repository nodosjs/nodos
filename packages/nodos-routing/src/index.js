import { promises as fs } from 'fs';
import yml from 'js-yaml';

export default async (routesFilePath, middlewares) => {
  const rawData = await fs.readFile(routesFilePath);
  const routes = yml.safeLoad(rawData);
  return new Router(routes, middlewares);
};
