import getExtensionData from '../src';

const config = {
  db: {
    type: 'sqlite',
    database: '/tmp/test.sqlite3',
    logging: false,
  },
};

test('nodos/db', async () => {
  await getExtensionData(config);
});
