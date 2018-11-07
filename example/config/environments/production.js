export default class Production extends Application {
  init() {
    super.init();
    this.config.logLevel = 'info';
    this.config.cacheModules = true;
  }
}
