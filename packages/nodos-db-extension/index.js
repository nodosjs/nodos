require('reflect-metadata');

const path = require('path');
const fastifyObjectionjs = require('fastify-objectionjs');

const commandBuilders = require('./lib/commands.js');
const generators = require('./lib/generators.js');
const Db = require('./lib/Db.js');
const log = require('./lib/logger.js');

module.exports = async (app) => {
  const appConfig = app.config.db;
  const defaultConfig = {
    client: 'sqlite3',
    entities: path.join(app.config.projectRoot, '/app/entities'),
    connection: path.join(app.config.projectRoot, '/db/development.sqlite3'),
    // TODO: подобные штуки не должны переопределяться
    migrations: {
      directory: path.join(app.config.projectRoot, '/db/migrations/'),
    },
  };
  const config = { ...defaultConfig, ...appConfig };
  log('init db extension', config);
  const db = new Db(config);

  const models = require(config.entities).default; // eslint-disable-line
  app.addPlugin(fastifyObjectionjs, { knexConfig: config, models });

  Object.values(commandBuilders).forEach((build) => app.addCommandBuilder(build));
  generators.forEach((generator) => app.addGenerator(generator));
  app.addMiddleware(path.resolve(__dirname, './lib/middlewares/handleDbErrors.js'));
  app.addMiddleware(path.resolve(__dirname, './lib/middlewares/checkMigrations.js'));
  app.addDependency('db', db);
  app.addHook('onStop', db.close);
  app.addHook('onReady', () => { db.connection = app.fastify.objection.knex; });
};
