const path = require('path');
const fsp = require('fs/promises');
const { PrismaClient } = require('@prisma/client');

// const commandBuilders = require('./lib/commands.js');
// const generators = require('./lib/generators.js');
// const Db = require('./lib/Db.js');
const log = require('./lib/logger.js');

const buildConnectionURL = ({
  type,
  host,
  username,
  password,
  port,
  database,
}) => `${type}://${username}:${password}@${host}:${port}/${database}`;


module.exports = async (app) => {
  const appConfig = app.config.db || {};
  // const entities = require(path.join(app.config.projectRoot, 'app/entities/index.js')).default;
  const defaultConfig = {
    port: process.env.NODOS_DB_PORT,
    host: process.env.NODOS_DB_HOSTNAME || 'localhost',
    type: process.env.NODOS_DB_TYPE,
    username: process.env.NODOS_DB_USERNAME,
    password: process.env.NODOS_DB_PASSWORD,
    database: process.env.NODOS_DB_NAME,
  };
  const config = { ...defaultConfig, ...appConfig };
  const url = buildConnectionURL(config);
  const prismaConfig = { datasources: { db: { url } } };
  log('init db extension', prismaConfig);

  const data = {}; // little hack for lazy loading
  // Object.values(commandBuilders).forEach((build) => app.addCommandBuilder(build));
  // generators.forEach((generator) => app.addGenerator(generator));
  // app.addMiddleware(path.resolve(__dirname, './lib/middlewares/handleDbErrors.js'));
  // app.addMiddleware(path.resolve(__dirname, './lib/middlewares/checkMigrations.js'));
  // app.fastify.addHook('onStop', () => db.close());
  app.fastify.addHook('onClose', () => data.db && data.db.close());
  app.fastify.addHook('onReady', async () => {
    const prisma = new PrismaClient(prismaConfig);
    data.db = prisma;
    app.addDependency('db', prisma);
  });
};
