export default async (app) => {
  app.config.logLevel = 'info';
  app.config.cacheModules = true;
  app.config.csrf = { enabled: true };
  app.config.db = {
    type: 'postgres',
    database: 'example_production',
  };
}
