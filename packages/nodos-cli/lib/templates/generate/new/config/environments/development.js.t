---
to: './<%= name %>/config/environments/development.js'
---
/* eslint-disable no-param-reassign */

import nodosWebpack from '@nodosjs/webpack-extension';

export default async (app) => {
  app.config.logLevel = 'debug';
  app.config.cacheModules = false;
  app.addExtension(nodosWebpack);

  app.config.db = {
    database: '<% name %>_development',
  };
};
