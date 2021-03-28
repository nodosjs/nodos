import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import { delay } from 'nanodelay';
import runNew from '../lib/new/index.js';

let dir;

beforeEach(async () => {
  dir = await fs.mkdtemp(path.join(os.tmpdir(), 'nodos-'));
});

test('nodos/new', async () => {
  const appPath = 'site';
  const projectRoot = path.join(dir, appPath);
  await runNew(dir, { exitProcess: false, args: ['new', appPath] });
  await delay(1000);
  const fileNames = await fs.readdir(projectRoot);
  expect(fileNames).toMatchSnapshot();
});
