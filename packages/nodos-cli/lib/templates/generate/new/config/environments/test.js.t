---
to: './<%= name %>/config/environments/test.js'
---
/* eslint-disable no-param-reassign */

export default async (app) => {
  app.config.logLevel = 'debug';
  app.config.cacheModules = true;
};
