import NodeEnvironment from 'jest-environment-node';
import { nodos } from '..';

export default class IntegrationEnvironment extends NodeEnvironment {
  async setup() {
    const app = await nodos(this.context.rootDir);
    this.global.get = app.get;
  }
}
