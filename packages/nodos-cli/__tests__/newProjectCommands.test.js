import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import runNew from '../lib/new.js';

let dir;

beforeEach(async () => {
  dir = await fs.mkdtemp(path.join(os.tmpdir(), 'nodos-'));
});

test('nodos/new', async () => {
  await runNew({ args: ['new', 'app', dir] });
  const fileNames = await fs.readDirectory(dir);
  expect(fileNames).toMatchSnapshot();
});
