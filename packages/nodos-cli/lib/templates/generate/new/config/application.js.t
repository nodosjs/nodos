---
to: './<%= name %>/config/application.js'
---
import buildNodosDbExtension from '@nodosjs/db-extension';
import webpacker from '@nodosjs/webpacker';

export default async (app) => {
  const db = await buildNodosDbExtension(app.config.db);
  app.addExtension(db);
  app.addExtension(webpacker);
};
