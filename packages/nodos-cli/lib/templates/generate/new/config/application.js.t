---
to: './<%= name %>/config/application.js'
---
import nodosDb from '@nodosjs/db-extension';
import nodosWebpack from '@nodosjs/webpack-extension';

export default async (app) => {
  app.addExtension(nodosDb);
  app.addExtension(nodosWebpack);
};
