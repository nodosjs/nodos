---
to: './<%= name %>/config/environments/production.js'
---
/* eslint-disable no-param-reassign */

export default async (app) => {
  app.config.logLevel = 'info';
  app.config.cacheModules = true;
};
