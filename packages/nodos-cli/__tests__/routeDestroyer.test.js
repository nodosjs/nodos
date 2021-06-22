import fsp from 'fs/promises';
import path from 'path';
import os from 'os';
import yaml from 'js-yaml';
import destroyRoute from '../lib/current/routeDestroyer.js';
import generateNewRoute from '../lib/current/routeGenerator.js';

// let dir;
const routePath = path.join(__dirname, '../__fixtures__/site/config/routes.yml');

let dir;

beforeEach(async () => {
  dir = await fsp.mkdtemp(path.join(os.tmpdir(), 'nodos-'));
  const configPath = path.join(dir, 'config');

  await fsp.mkdir(configPath);
  await fsp.copyFile(routePath, path.join(configPath, 'routes.yml'));
  await generateNewRoute(dir, 'resources', 'posts');
  await generateNewRoute(dir, 'resource', 'order');
});

test('nodos/destroy/resources', async () => {
  await generateNewRoute(dir, 'resources', 'users');
  const { newYaml: result } = await destroyRoute(dir, 'resources', 'users');
  expect(result).toMatchSnapshot();
});

test('nodos/destroy/resource', async () => {
  await generateNewRoute(dir, 'resource', 'session');
  const { newYaml: result } = await destroyRoute(dir, 'resource', 'session');
  expect(result).toMatchSnapshot();
});

test('nodos/destroy/nestedResources', async () => {
  const scopeName = '/';
  const routesPath = path.join(dir, 'config/routes.yml');
  const currentYaml = await fsp.readFile(routesPath, 'utf8');
  const data = yaml.load(currentYaml);

  const scope = data.scopes.find((s) => s.name === scopeName);
  scope.routes.push({
    resources: {
      name: 'users',
      routes: [
        {
          resources: 'comments',
        },
      ],
    },
  });
  const newYaml = yaml.dump(data);
  await fsp.writeFile(routesPath, newYaml);

  const { newYaml: result } = await destroyRoute(dir, 'resources', 'users');
  expect(result).toMatchSnapshot();
});
