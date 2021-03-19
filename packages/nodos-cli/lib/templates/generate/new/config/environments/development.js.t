---
to: './<%= name %>/config/environments/development.js'
---

/* @ts-check */
/* eslint-disable no-param-reassign */

import nodosWebpack from '@nodosjs/webpack-extension';

export default async (app) => {
  app.addExtension(nodosWebpack);

  app.config.logLevel = 'debug';
  app.config.cacheModules = false;

  app.config.db = {
    type: 'sqljs',
    location: 'db/development.sqlite',
  };
};
