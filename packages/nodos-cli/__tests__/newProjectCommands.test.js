import fsp from 'fs/promises';
import path from 'path';
import os from 'os';
import { delay } from 'nanodelay';
import runNew from '../lib/new/index.js';

let dir;

beforeEach(async () => {
  dir = await fsp.mkdtemp(path.join(os.tmpdir(), 'nodos-'));
});

test('nodos/new', async () => {
  const appPath = 'site';
  const projectRoot = path.join(dir, appPath);
  const options = { exitProcess: false, args: ['new', appPath, '--skip-install'] };
  await runNew(dir, options);
  await delay(1000);
  const fileNames = await fsp.readdir(projectRoot);
  expect(fileNames).toMatchSnapshot();
});
