import fsp from 'fs/promises';
import path from 'path';
import os from 'os';
import generateNewRoute from '../lib/current/routeGenerator.js';

// let dir;
const routePath = path.join(__dirname, '../__fixtures__/site/config/routes.yml');

let dir;

beforeEach(async () => {
  dir = await fsp.mkdtemp(path.join(os.tmpdir(), 'nodos-'));
  const configPath = path.join(dir, 'config');

  await fsp.mkdir(configPath);
  fsp.copyFile(routePath, path.join(configPath, 'routes.yml'));
});

test('nodos/generate/resources', async () => {
  const result = await generateNewRoute(dir, 'resources', 'users');
  expect(result).toMatchSnapshot();
});

test('nodos/generate/resource', async () => {
  const result = await generateNewRoute(dir, 'resource', 'session');
  expect(result).toMatchSnapshot();
});
