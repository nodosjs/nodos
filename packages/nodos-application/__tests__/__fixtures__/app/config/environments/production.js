/* eslint-disable no-param-reassign */

export default (config) => {
  config.logLevel = 'info';
  config.secretKeyBase = 'flying spaghetti monster is in production';
  config.cacheModules = true;
  config.host = 'http://example.com';
};
