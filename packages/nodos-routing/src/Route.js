import { buildRoutes } from './Router';

export default class Route {
  constructor({
    parent, resourceName, middlewares, handlers, path, children = [],
  }) {
    this.parent = parent;
    this.resourceName = resourceName;
    this.middlewares = middlewares;
    this.handlers = handlers;
    this.path = path;
    this.children = buildRoutes(children, { parent: this, path, middlewares });
  }
}
