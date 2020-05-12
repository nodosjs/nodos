const { createConnection } = require('typeorm');

class Db {
  constructor(config) {
    this.config = config;
  }

  async connect() {
    this.connection = await createConnection(this.config);
  }

  async query(...args) {
    const localRunner = this.connection.createQueryRunner();
    return localRunner.query(...args);
  }

  close() {
    return this.connection.close()
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
