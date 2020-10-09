export default async (app) => {
  app.config.logLevel = 'debug';
  app.config.cacheModules = true;
  app.config.csrf = { enabled: false }
};
