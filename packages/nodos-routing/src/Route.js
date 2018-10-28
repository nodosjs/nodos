export default class Route {
  constructor(options) {
    this.parent = options.parent;
    this.resourceName = options.resourceName;
    this.middlewares = options.middlewares;
    this.actions = options.actions;
    this.path = options.path;
  }
}
