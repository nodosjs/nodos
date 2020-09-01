---
to: './<%= name %>/config/environments/production.js'
---
export default async (app) => {
  app.config.logLevel = 'info';
  app.config.cacheModules = true;
}
