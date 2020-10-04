---
to: './<%= name %>/config/application.js'
---
import nodosDb from '@nodosjs/db-extension';
import nodosWebpack from '@nodosjs/webpack-extension';
import nodosView from '@nodosjs/view-extension';

export default async (app) => {
  app.addExtension(nodosDb);
  app.addExtension(nodosView);
  app.addExtension(nodosWebpack);
};
