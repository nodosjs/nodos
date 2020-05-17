const NodeEnvironment = require('jest-environment-node');
const { nodos } = require('@nodosjs/core');

class IntegrationEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.config = config;

    // this.global.openSession = async () => {
    //   app = nodos(this.config.rootDir);
    //   await app.start();
    //   return app;
    // };
  }

  async setup() {
    this.app = nodos(this.config.rootDir);
    await this.app.start();
    this.global.app = this.app;
  }

  async tearDown() {
    await this.app.stop();
  }
}

module.exports = IntegrationEnvironment;
