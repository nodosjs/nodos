---
to: './<%= name %>/config/environments/development.js'
---

/* @ts-check */
/* eslint-disable no-param-reassign */

<% if (!without.includes('webpack')) { -%>
import nodosWebpack from '@nodosjs/webpack-extension';

<% } -%>
export default async (app) => {
<% if (!without.includes('webpack')) { -%>
  app.addExtension(nodosWebpack);

<% } -%>
  app.config.logLevel = 'debug';
  app.config.cacheModules = false;

  app.config.db = {
    type: 'sqlite',
    database: 'db/development.sqlite',
  };
};
