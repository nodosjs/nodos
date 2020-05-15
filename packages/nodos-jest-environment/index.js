const NodeEnvironment = require('jest-environment-node');
const { nodos } = require('@nodosjs/core');

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

module.exports = IntegrationEnvironment;

