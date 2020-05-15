// require('reflect-metadata');
const commands = require('./commands');
const Db = require('./Db');

module.exports = async (app) => {
  const db = new Db(app.config.db);
  await db.connect();
  Object.values(commands).forEach((command) => app.addCommand(command));
  app.addDependency('db', db);
  app.addHook('onStop', db.close);
};
