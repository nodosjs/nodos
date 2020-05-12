export default class Production extends Application {
  async init() {
    super.init();
    this.config.logLevel = 'info';
    this.config.cacheModules = true;
  }
}
