---
to: './<%= name %>/config/environments/production.js'
---
/* eslint-disable no-param-reassign */

export default (config) => {
  config.logLevel = 'info';
  config.cacheModules = true;
};
