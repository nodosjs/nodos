---
to: './<%= name %>/config/environments/production.js'
---
/* eslint-disable no-param-reassign */

import nodosWebpack from '@nodosjs/webpack-extension';

export default async (app) => {
  app.config.logLevel = 'info';
  app.config.cacheModules = true;

  app.addExtension(nodosWebpack);
};
