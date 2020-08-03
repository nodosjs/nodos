require('reflect-metadata');
const path = require('path');
const commandBuilders = require('./lib/commands.js');
const generators = require('./lib/generators.js');
const Db = require('./lib/Db.js');

module.exports = (config = {}) => async (app) => {
  const defaultConfig = {
    client: 'sqlite3',
    entities: path.join(app.config.projectRoot, '/app/entities'),
    connection: path.join(app.config.projectRoot, '/db/development.sqlite3'),
    migrations: {
      directory: path.join(app.config.projectRoot, '/db/migrations/'),
    },
  };
  const db = new Db({ ...defaultConfig, ...config });
  // TODO make it lazy
  await db.connect(app);
  Object.values(commandBuilders).forEach((build) => app.addCommandBuilder(build));
  generators.forEach((generator) => app.addGenerator(generator));
  app.addDependency('db', db);
  app.addHook('onStop', db.close);
};
