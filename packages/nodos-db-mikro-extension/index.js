const path = require('path');
const fsp = require('fs/promises');
// const fastifyObjectionjs = require('fastify-objectionjs');
const { MikroORM } = require('@mikro-orm/core');

// const commandBuilders = require('./lib/commands.js');
// const generators = require('./lib/generators.js');
// const Db = require('./lib/Db.js');
const log = require('./lib/logger.js');

const portsMapping = {
  postgres: 5432,
  mysql: 3306,
};

module.exports = async (app) => {
  const appConfig = app.config.db || {};
  // const entities = require(path.join(app.config.projectRoot, 'app/entities/index.js')).default;
  const defaultConfig = {
    port: portsMapping[appConfig.type],
    synchronize: true, // # FIXME: only development and tests
    host: process.env.NODOS_DB_HOSTNAME || 'localhost',
    type: process.env.NODOS_DB_TYPE,
    username: process.env.NODOS_DB_USERNAME,
    password: process.env.NODOS_DB_PASSWORD,
    entitiesPath: path.join(app.config.projectRoot, 'app/entities'),
    // connection: path.join(app.config.projectRoot, 'db/development.sqlite3'),
    // TODO: подобные штуки не должны переопределяться
    migrationPaths: [path.join(app.config.projectRoot, 'db/migrations/**/*.js')],
    logging: true,
    connectTimeout: 1000,
    debug: true,
  };
  const config = { ...defaultConfig, ...appConfig };
  log('init db extension', config);

  const data = {}; // little hack for lazy loading
  // Object.values(commandBuilders).forEach((build) => app.addCommandBuilder(build));
  // generators.forEach((generator) => app.addGenerator(generator));
  // app.addMiddleware(path.resolve(__dirname, './lib/middlewares/handleDbErrors.js'));
  // app.addMiddleware(path.resolve(__dirname, './lib/middlewares/checkMigrations.js'));
  // app.fastify.addHook('onStop', () => db.close());
  app.fastify.addHook('onClose', () => data.db && data.db.close());
  const orm = await MikroORM.init({
    entities: [config.entitiesPath],
    dbName: config.database,
    type: config.type,
    debug: config.debug,
    // clientUrl: '...', // defaults to 'mongodb://localhost:27017' for mongodb driver
  });
  app.fastify.addHook('onReady', async () => {
    // const db = await createConnection(config);
    data.db = orm;
    app.addDependency('db', orm);
  });
};
