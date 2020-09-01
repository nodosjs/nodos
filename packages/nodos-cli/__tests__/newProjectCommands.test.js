import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import runNew from '../lib/new.js';

let dir;

beforeEach(async () => {
  dir = await fs.mkdtemp(path.join(os.tmpdir(), 'nodos-'));
});

test('nodos/new', async () => {
  const appName = 'site';
  await runNew({ args: ['new', appName, dir] });
  const fileNames = await fs.readdir(path.join(dir, appName));
  expect(fileNames).toMatchSnapshot();
});
