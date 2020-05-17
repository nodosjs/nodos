// const _ = require('lodash');

// TODO add generators (model, migrations)
// TODO add commands (migration, rollback, reset)

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
