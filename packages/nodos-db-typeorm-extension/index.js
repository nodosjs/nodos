require('reflect-metadata');

const path = require('path');
// const fastifyObjectionjs = require('fastify-objectionjs');
const { createConnection } = require('typeorm');

// const commandBuilders = require('./lib/commands.js');
// const generators = require('./lib/generators.js');
// const Db = require('./lib/Db.js');
const log = require('./lib/logger.js');

const portsMapping = {
  postgres: 5432,
  mysql: 3306,
};

module.exports = async (app) => {
  const appConfig = app.config.db;
  // const entities = require(path.join(app.config.projectRoot, 'app/entities/index.js')).default;
  const defaultConfig = {
    port: portsMapping[appConfig.type],
    synchronize: true,
    host: 'localhost',
    entities: [path.join(app.config.projectRoot, 'app/entities/*.js')],
    // connection: path.join(app.config.projectRoot, 'db/development.sqlite3'),
    // TODO: подобные штуки не должны переопределяться
    migrations: [path.join(app.config.projectRoot, 'db/migrations/**/*.js')],
    logging: true,
    connectTimeout: 1000,
    // debug: true
  };
  const config = { ...defaultConfig, ...appConfig };
  log('init db extension', config);

  const data = {}; // little hack for lazy loading
  // Object.values(commandBuilders).forEach((build) => app.addCommandBuilder(build));
  // generators.forEach((generator) => app.addGenerator(generator));
  app.addMiddleware(path.resolve(__dirname, './lib/middlewares/handleDbErrors.js'));
  app.addMiddleware(path.resolve(__dirname, './lib/middlewares/checkMigrations.js'));
  // app.fastify.addHook('onStop', () => db.close());
  app.fastify.addHook('onClose', () => data.db && data.db.close());
  app.fastify.addHook('onReady', async () => {
    const db = await createConnection(config);
    data.db = db;
    app.addDependency('db', db);
  });
};
