// const path = require('path');
// const fsp = require('fs/promises');
const { PrismaClient } = require('@prisma/client');

// const commandBuilders = require('./lib/commands.js');
// const generators = require('./lib/generators.js');
// const Db = require('./lib/Db.js');
// const log = require('./lib/logger.js');

module.exports = async (app) => {
  // const appConfig = app.config.db || {};

  // TODO: we have to decide how we will configure Prisma - nodos config files or schema.prisma file
  // const defaultConfig = {
  //   port: process.env.NODOS_DB_PORT,
  //   host: process.env.NODOS_DB_HOSTNAME || 'localhost',
  //   type: process.env.NODOS_DB_TYPE,
  //   username: process.env.NODOS_DB_USERNAME,
  //   password: process.env.NODOS_DB_PASSWORD,
  //   database: process.env.NODOS_DB_NAME,
  // };
  // const config = { ...defaultConfig, ...appConfig };

  const data = {}; // little hack for lazy loading
  // Object.values(commandBuilders).forEach((build) => app.addCommandBuilder(build));
  // generators.forEach((generator) => app.addGenerator(generator));
  // app.addMiddleware(path.resolve(__dirname, './lib/middlewares/handleDbErrors.js'));
  // app.addMiddleware(path.resolve(__dirname, './lib/middlewares/checkMigrations.js'));
  // app.fastify.addHook('onStop', () => db.close());
  app.fastify.addHook('onClose', () => data.db && data.db.$disconnect());
  app.fastify.addHook('onReady', async () => {
    const prisma = new PrismaClient();
    data.db = prisma;
    app.addDependency('db', prisma);
  });
};
