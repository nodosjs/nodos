import { promises as fsp } from 'fs';
import path from 'path';
import { delay } from 'nanodelay';
import { nodos } from '@nodosjs/core';
import { runNew } from '@nodosjs/cli';
import execa from 'execa';

const envs = ['production', 'test', 'development'];
// const envs = ['development'];

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
  await delay(1000);

  const appScssFilePath = path.join(projectRoot, 'app/assets/stylesheets/application.scss');
  await fsp.writeFile(appScssFilePath, '');
});

test('start server', async () => {
  const app = await nodos(projectRoot);
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
  const result = await execa('../../node_modules/.bin/nodos', ['routes'], options);
  expect(result).not.toBeNull();
  expect(result.stdout).toMatchSnapshot();
});
