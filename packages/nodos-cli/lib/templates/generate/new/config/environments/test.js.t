---
to: './<%= name %>/config/environments/test.js'
---
export default async (app) => {
  app.config.logLevel = 'debug';
  app.config.cacheModules = true;
};
