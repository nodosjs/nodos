const NodeEnvironment = require('jest-environment-node');
const { nodos } = require('..');

export default class IntegrationEnvironment extends NodeEnvironment {
  // constructor(config) {
  //   super(config);
  // }

  async setup() {
    await super.setup();
    const app = await nodos(this.context.rootDir);
    this.global.get = app.get;
  }

  async teardown() {
    await super.teardown();
  }
}
