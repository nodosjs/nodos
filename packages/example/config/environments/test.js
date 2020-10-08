export default async (app) => {
  app.config.logLevel = 'debug';
  app.config.cacheModules = true;
  app.config.csrfOptions = { ignoreMethods: ['HEAD', 'OPTIONS', 'GET', 'POST', 'PUT', 'PATCH'] };
};
