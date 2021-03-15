---
to: './<%= name %>/config/environments/production.js'
---

/* eslint-disable no-param-reassign */

export default async (app) => {
  app.config.logLevel = 'info';
  app.config.cacheModules = true;

  app.config.db = {
    database: '<%= name %>_production',
    host: process.env.NODOS_DB_HOSTNAME,
    username: process.env.NODOS_DB_USERNAME,
    password: process.env.NODOS_DB_PASSWORD,
  };
};
