/* eslint-disable no-param-reassign */

export default (config) => {
  config.cacheModules = false;
  config.logLevel = 'debug';
  config.secretKeyBase = 'flying spaghetti monster is among us';
  config.host = 'http://example.com';
  config.plugins.push(
    import('fastify-error-page'),
  );
};
