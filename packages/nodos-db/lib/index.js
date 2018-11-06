import 'reflect-metadata';
import command from './commands';
import Db from './Db';

export default async (app) => {
  const db = new Db(app.config.db);
  await db.connect();
  app.addCommand(command);
  app.addDependency('db', db);
  app.addHook('onStop', db.close);
};
