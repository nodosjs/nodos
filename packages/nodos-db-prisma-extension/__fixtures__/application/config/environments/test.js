export default (app) => {
  app.config.logLevel = 'debug';
  app.config.errorHandler = false;
  app.config.cacheModules = true;
  app.config.host = 'http://example.com';
};
