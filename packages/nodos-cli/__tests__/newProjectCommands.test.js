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
  const options = { exitProcess: false, args: ['new', appPath, '--skip-install', '--skip-db'] };
  await runNew(dir, options);
  await setTimeout(1000);
  const fileNames = await fsp.readdir(projectRoot);
  expect(fileNames).toMatchSnapshot();
});
