import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import { delay } from 'nanodelay';
import runNew from '../lib/new.js';

let dir;

beforeEach(async () => {
  dir = await fs.mkdtemp(path.join(os.tmpdir(), 'nodos-'));
});

test('nodos/new', async () => {
  const appName = 'site';
  const projectRoot = path.join(dir, appName);
  await runNew(dir, { args: ['new', appName] });
  await delay(1000);
  const fileNames = await fs.readdir(projectRoot);
  expect(fileNames).toMatchSnapshot();
});
