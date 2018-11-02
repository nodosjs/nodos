import NodeEnvironment from 'jest-environment-node';
import { nodos } from '..';

class IntegrationEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.config = config;
  }

  async setup() {
    const app = await nodos(this.config.rootDir);
    ['get', 'post', 'put', 'patch', 'delete'].forEach((verb) => {
      this.global[verb] = app[verb];
    });
  }
}

export default IntegrationEnvironment;
module.exports = IntegrationEnvironment;
