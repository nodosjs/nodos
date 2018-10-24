export default class Route {
  constructor(options) {
    this.name = options.name;
    this.middlewares = options.middlewares;
    this.url = options.url;
    this.method = options.method;
  }
}
