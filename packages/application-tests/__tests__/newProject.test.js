import { promises as fsp } from 'fs';
import path from 'path';
import { nodos } from '@nodosjs/core';
import { runNew } from '@nodosjs/cli';
import execa from 'execa';

let projectRoot;

beforeAll(async () => {
  const dir = path.join(__dirname, '..', '__applications__');
  const apps = await fsp.readdir(dir);
  apps.sort();
  const oldAppPaths = apps.reverse().slice(1).map((app) => path.join(dir, app));
  await Promise.all(oldAppPaths.map((appPath) => fsp.rmdir(appPath, { recursive: true })));

  const appName = `nodos-${Date.now().toString()}`;
  projectRoot = path.join(dir, appName);

  await runNew({ args: ['new', appName, dir] });
});

test('start server', async () => {
  const app = await nodos(projectRoot);
  await app.initApp();
  await app.initServer();
  await app.listen();
  await app.close();
  expect(true).toBe(true);
});

test('list routes', async () => {
  const options = {
    cwd: projectRoot,
  };
  const result = await execa('npx', ['nodos', 'routes'], options);
  expect(result).not.toBeNull();
  expect(result.stdout).toMatchSnapshot();
});
