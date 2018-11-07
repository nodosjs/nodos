import _ from 'lodash';
import path from 'path';
import { bin } from '@nodosjs/application';
import * as commands from '../lib/commands';

const projectRoot = path.join(__dirname, '__fixtures__/app');

test('nodos/cli/console', async () => {
  const nodos = () => {
    const app = {
      start: _.noop,
      stop: _.noop,
      commands: Object.values(commands),
    };
    return app;
  };
  const container = {
    nodos,
  };
  await bin(projectRoot, ['db'], { container });
  // expect(replServer.context).toHaveProperty('app');
});
