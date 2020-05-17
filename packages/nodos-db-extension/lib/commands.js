// const _ = require('lodash');

const dbCommandBuilder = () => ({
  command: 'db',
  describe: 'run db subcommands',
  builder: {},
  handler: async () => {
    await Promise.resolve();
    // const app = container.nodos(argv.projectRoot);
  },
});

module.exports = { dbCommandBuilder };
