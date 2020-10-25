export default async (app) => {
  app.config.logLevel = 'info';
  app.config.cacheModules = true;
  app.config.csrf = { enabled: true }
}
