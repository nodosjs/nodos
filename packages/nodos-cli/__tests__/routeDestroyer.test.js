import fsp from 'fs/promises';
import path from 'path';
import os from 'os';
import destroyRoute from '../lib/current/routeDestroyer.js';
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

test('nodos/destroy/resource', async () => {
  await generateNewRoute(dir, 'users');
  const { newYaml: result } = await destroyRoute(dir, 'users');
  expect(result).toMatchSnapshot();
});
