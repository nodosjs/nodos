import path from 'path';
import yml from 'js-yaml';
import { promises as fs } from 'fs';
import Router from '@nodos/routing';

export default async (projectRootPath) => {
  const routesFilePath = path.join(projectRootPath, 'config', 'routes.yml');
  const rawData = await fs.readFile(routesFilePath);
  const routesMap = yml.safeLoad(rawData);
  return new Router(routesMap);
};


