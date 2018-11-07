import 'reflect-metadata';
import * as commands from './commands';
import Db from './Db';

export default async (app) => {
  const db = new Db(app.config.db);
  await db.connect();
  Object.values(commands).forEach(app.addCommand);
  app.addDependency('db', db);
  app.addHook('onStop', db.close);
};
