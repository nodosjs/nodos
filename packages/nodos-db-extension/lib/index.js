require('reflect-metadata');
const commandBuilders = require('./commands');
const Db = require('./Db');

module.exports = async (app) => {
  const db = new Db(app.config.db);
  await db.connect();
  Object.values(commandBuilders).forEach((build) => app.addCommandBuilder(build));
  app.addDependency('db', db);
  app.addHook('onStop', db.close);
};
