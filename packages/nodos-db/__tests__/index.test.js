import Db from '../src';

const config = {
  type: 'postgres',
  username: 'postgres',
  database: 'wow',
  logging: true,
};

let db;

// beforeEach(async () => {
// });

test('createDb', async () => {
  db = new Db(config);
  // const runner = await db.createQueryRunner();
  try {
    await db.dropDb();
  } catch (e) {
    await db.createDb();
  }
});
