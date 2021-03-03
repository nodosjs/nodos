---
to: './<%= name %>/config/application.js'
---
import nodosDb from '@nodosjs/db-objection-extension';
import nodosView from '@nodosjs/view-extension';

export default async (app) => {
  app.addExtension(nodosDb);
  app.addExtension(nodosView);
};
