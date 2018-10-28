require('@babel/register');
const NodeEnvironment = require('jest-environment-node');
const { nodos } = require('..');

class IntegrationEnvironment extends NodeEnvironment {
  // constructor(config) {
  //   super(config);
  // }

  async setup() {
    await super.setup();
    const app = await nodos(`${__dirname}/../../__tests__/__fixtures__/app`);
    console.log('!!!!!!!!');
    this.global.get = app.get;
  }

  async teardown() {
    await super.teardown();
  }
}

module.exports = IntegrationEnvironment;
