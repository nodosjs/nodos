const fastifyObjectionjs = require('fastify-objectionjs');

class Db {
  constructor(config) {
    this.config = config;
  }

  async connect(app) {
    const models = require(this.config.entities).default; // eslint-disable-line
    app.plugins.push([fastifyObjectionjs, { knexConfig: this.config, models }]);
  }

  async query(...args) {
    return this.connection.query(...args);
  }

  close() {
    return this.connection.close();
  }

  // createDb = async () => {
  //   // FIXME implement for every db
  //   const localConn = await createConnection({ ...this.config, database: 'template1' });
  //   const localRunner = localConn.createQueryRunner();
  //   try {
  //     // FIXME: use placeholder
  //     await localRunner.query(`CREATE DATABASE ${this.config.database}`);
  //     await localConn.close();
  //   } catch (e) {
  //     await localConn.close();
  //     throw e;
  //   }
  // };

  // dropDb = async () => {
  //   // FIXME implement for every db
  //   const localConn = await createConnection({ ...this.config, database: 'template1' });
  //   const localRunner = localConn.createQueryRunner();
  //   try {
  //     // FIXME: use placeholder
  //     await localRunner.query(`DROP DATABASE ${this.config.database}`);
  //     await localConn.close();
  //   } catch (e) {
  //     await localConn.close();
  //     throw e;
  //   }
  // };
}

module.exports = Db;
