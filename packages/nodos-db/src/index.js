import commandBuilder from './commands';
import Db from './Db';

export default async (config) => {
  const db = new Db(config.db);
  await db.connect();
  return {
    commandBuilders: [commandBuilder],
    context: { db },
    hooks: {
      async close() {
        await db.close();
      },
    },
  };
};
