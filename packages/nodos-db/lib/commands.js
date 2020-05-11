// const _ = require('lodash');

const dbCommand = ({ container }) => ({
  command: 'db',
  describe: 'run db subcommands',
  builder: {},
  handler: async (argv) => {
    await Promise.resolve();
    // const app = container.nodos(argv.projectRoot);
  },
});

module.exports = { dbCommand }
