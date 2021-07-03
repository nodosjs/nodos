// @ts-check

// const log = require('./logger.js');

class Route {
  constructor(scope, options) {
    // log('new route', scope, options);

    this.scope = scope;
    this.actionName = options.actionName;
    this.controllerName = options.controllerName;
    this.controllerPath = options.controllerPath;
    this.template = options.template;
    this.name = options.name;
    this.method = options.method;
    this.pipeline = scope.pipeline;
    this.middlewares = scope.middlewares;
  }

  // TODO: route is not responsible for the view
  get controllerAction() {
    return `${this.controllerName}#${this.actionName}`;
  }
}

module.exports = Route;
