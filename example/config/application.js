import nodosDbExtension from '@nodosjs/db-extension';

export default (app) => {
  app.addExtension(nodosDbExtension);
  app.config.db = {
    type: 'sqljs',
    synchronize: true,
    logging: true,
    // database: 'db/development.sqlite3',
    entities: [
      `${__dirname}/../app/entities/*.js`,
    ],
  };
}
