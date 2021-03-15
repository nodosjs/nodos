---
to: './<%= name %>/config/application.js'
---
import nodosDb from '@nodosjs/db-typeorm-extension';
import nodosView from '@nodosjs/view-extension';

export default async (app) => {
  app.addExtension(nodosDb);
  app.addExtension(nodosView);

  app.config.db = {
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '',
  };
};
