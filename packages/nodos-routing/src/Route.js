export default class Route {
  constructor(options) {
    this.parent = options.parent;
    this.resourceName = options.resourceName;
    this.middlewares = options.middlewares;
    this.handlers = options.handlers;
    this.path = options.path;
  }
}
