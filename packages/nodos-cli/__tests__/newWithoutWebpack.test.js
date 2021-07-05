import fsp from 'fs/promises';
import path from 'path';
import os from 'os';
import { setTimeout } from 'timers/promises';
import runNew from '../lib/new/index.js';

let dir;

beforeEach(async () => {
  dir = await fsp.mkdtemp(path.join(os.tmpdir(), 'nodos-'));
});

test('nodos/new', async () => {
  const appPath = 'site';
  const projectRoot = path.join(dir, appPath);
  const options = { exitProcess: false, args: ['new', appPath, '--skip-install', '--skip-db', '--without', 'webpack'] };
  await runNew(dir, options);
  await setTimeout(1000);
  const configFiles = await fsp.readdir(path.join(projectRoot, '/config'));
  expect(configFiles).toMatchSnapshot();

  const packageJsonContent = await fsp.readFile(path.join(projectRoot, 'package.json'), 'utf-8');
  expect(packageJsonContent).toMatchSnapshot();
});
