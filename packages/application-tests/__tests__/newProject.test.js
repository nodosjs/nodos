import { promises as fsp } from 'fs';
import path from 'path';
import { nodos } from '@nodosjs/core';
import { runNew } from '@nodosjs/cli';
import execa from 'execa';

// TODO: development пришлось отрубить так как запускается вебпкак который не умеет каскадно смотреть либы
// SassError: Can't find stylesheet to import.
const envs = ['production', 'test'];

let projectRoot;

beforeAll(async () => {
  const dir = path.join(__dirname, '..', '__applications__');
  await fsp.mkdir(dir, { recursive: true });
  const apps = await fsp.readdir(dir);
  apps.sort();
  const oldAppPaths = apps.reverse().slice(1).map((app) => path.join(dir, app));
  await Promise.all(oldAppPaths.map((appPath) => fsp.rmdir(appPath, { recursive: true })));

  const appName = `nodos-${Date.now().toString()}`;
  projectRoot = path.join(dir, appName);

  const options = { exitProcess: false, args: ['new', appName] };
  await runNew(dir, options);
});

test.each(envs)('start server', async (env) => {
  const app = await nodos(projectRoot, env);
  await app.initApp();
  await app.listen();
  await app.close();
  expect(true).toBe(true);
});

test.each(envs)('check cli', async (env) => {
  const options = {
    cwd: projectRoot,
    env: { NODE_ENV: env },
  };
  const result = await execa('npx', ['nodos', 'routes'], options);
  expect(result).not.toBeNull();
  expect(result.stdout).toMatchSnapshot();
});
