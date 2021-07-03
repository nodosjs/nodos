// @ts-check

const log = require('./logger.js');

class Route {
  constructor(scope, options) {
    log('new route', scope, options);

    this.scope = scope;
    this.actionName = options.actionName;
    this.controllerName = options.controllerName;
    this.template = options.template;
    this.name = options.name;
    this.method = options.method;
  }

  get controllerAction() {
    return `${this.controllerName}#${this.actionName}`;
  }
}

module.exports = Route;
