import NodeEnvironment from 'jest-environment-node';
import { nodos } from '..';

class IntegrationEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.config = config;
  }

  async setup() {
    const app = await nodos(this.config.rootDir);
    this.global.get = app.get;
  }
}

export default IntegrationEnvironment;
module.export = IntegrationEnvironment;
