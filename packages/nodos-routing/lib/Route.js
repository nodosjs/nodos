class Route {
  constructor(options) {
    this.parent = options.parent;
    this.actionName = options.actionName;
    this.resourceName = options.resourceName;
    this.pipeline = options.pipeline;
    this.middlewares = options.middlewares;
    this.url = options.url;
    this.name = options.name;
    this.method = options.method;
  }

  get controllerAction() {
    return `${this.resourceName}#${this.actionName}`;
  }
}

module.exports = Route;
