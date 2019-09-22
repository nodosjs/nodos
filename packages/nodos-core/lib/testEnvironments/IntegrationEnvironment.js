import NodeEnvironment from 'jest-environment-node';
import { nodos } from '..';
// import '@babel/register';

class IntegrationEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.config = config;
  }

  async setup() {
    this.app = await nodos(this.config.rootDir);
    await this.app.start();
    ['get', 'post', 'put', 'patch', 'delete'].forEach((verb) => {
      this.global[verb] = (...args) => this.app[verb](...args);
    });
  }

  async tearDown() {
    await this.app.stop();
  }
}

export default IntegrationEnvironment;
module.exports = IntegrationEnvironment;
