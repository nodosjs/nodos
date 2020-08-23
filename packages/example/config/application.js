import buildNodosDbExtension from '@nodosjs/db-extension';

export default async (app) => {
  const db = await buildNodosDbExtension(app.config.db);
  app.addExtension(db);
};
