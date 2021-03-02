const knex = require('knex');

const migrateHandler = async (knexClient) => {
  const [batchNo, log] = await knexClient.migrate.latest();
  const message = log.length === 0
    ? 'Already up to date'
    : [`Batch ${batchNo} run: ${log.length} migrations`, ...log].join('\n');

  console.log(message);
};

const rollbackHandler = async (knexClient, options = {}, all = false) => {
  const message = all ? 'Rollback all migrations' : 'Rollback last migration';
  console.log(message);
  await knexClient.migrate.rollback(options, all);
};

const resetHandler = async (knexClient) => {
  await knexClient.migrate.forceFreeMigrationsLock();
  await rollbackHandler(knexClient, {}, true);
  await migrateHandler(knexClient);
};

const subCommandHandler = async (config, subcommand) => {
  const knexClient = knex(config);

  const subcommandHandlerMapping = {
    migrate: migrateHandler,
    rollback: rollbackHandler,
    reset: resetHandler,
  };

  await subcommandHandlerMapping[subcommand](knexClient);
  await knexClient.destroy();
};

const dbCommandBuilder = ({ app }) => ({
  command: 'db <subcommand>',
  describe: 'run db subcommands',
  builder: (command) => {
    command.positional('subcommand', {
      describe: 'migrate rollback reset',
      choices: ['migrate', 'rollback', 'reset'],
    });
  },
  handler: async ({ subcommand }) => subCommandHandler(app.container.db.config, subcommand),
});

module.exports = { dbCommandBuilder };
