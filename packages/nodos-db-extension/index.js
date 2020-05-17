require('reflect-metadata');
const commandBuilders = require('./lib/commands.js');
const Db = require('./lib/Db.js');

module.exports = (config = {}) => async (app) => {
  const defaultConfig = {
    type: 'sqljs',
    synchronize: true,
    logging: true,
    entities: [
      `${app.config.projectRoot}/app/entities/*.js`,
    ],
  };
  console.log(defaultConfig);
  const db = new Db({ ...defaultConfig, ...config });
  // TODO make it lazy
  await db.connect();
  Object.values(commandBuilders).forEach((build) => app.addCommandBuilder(build));
  app.addDependency('db', db);
  app.addHook('onStop', db.close);
};
