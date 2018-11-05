import Db from '../src/Db';

const config = {
  type: 'sqlite',
  host: 'db',
  username: 'postgres',
  database: 'wow',
  logging: false,
};

test('nodos/db', async () => {
  // const db = new Db(config);
  // // const runner = await db.createQueryRunner();
  // try {
  //   await db.dropDb();
  // } catch (e) {
  //   await db.createDb();
  // }
});
