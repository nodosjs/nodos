// @ts-check

const _ = require('lodash');
const urlJoin = require('url-join');
const validateSchema = require('./validator.js');
const { buildRoot, buildResources, buildResource } = require('./builders.js');

const detectRouteType = (/** @type {string} */ currentName) => {
  const names = ['resources', 'resource', 'root'];
  return names.find((name) => name === currentName);
};

// const normalizeRouteItem = (valueOrValues) => {
//   const routeItem = _.isObject(valueOrValues) ? valueOrValues : { name: valueOrValues };
//   const routes = routeItem.routes || [];

//   return {
//     ...routeItem,
//     actionNames: buildActionNames(routeItem),
//     routes,
//   };
// };

const mapResourcesToTemplate = (/** @type {string} */ template, /** @type {any[]} */ params) => {
  const ids = params[Symbol.iterator]();
  return template.replace(/:\w+/g, () => ids.next().value);
};

const types = {
  root: (value, _rec, scope) => buildRoot(value, scope),
  resources: (value, rec, scope) => buildResources(value, rec, scope),
  resource: (value, rec, scope) => buildResource(value, rec, scope),
};

const buildRoute = (route, scope, iter) => {
  const typeName = detectRouteType(_.first(Object.keys(route)));
  return types[typeName](route[typeName], iter, scope);
};

const buildRoutes = (scope) => scope.routes.map((route) => buildRoute(route, scope, buildRoutes));

class Router {
  constructor(routeMap, options) {
    validateSchema(routeMap);

    this.host = options.host;
    this.routeMap = routeMap;
    // TODO: why do we store it inside?
    this.scopes = routeMap.scopes.map(({ path, pipeline, routes }) => ({
      path,
      routes,
      name: path.slice(1),
      parentResourceInfo: {},
      middlewares: routeMap.pipelines[pipeline],
    }));
    this.routes = this.scopes
      .map((scope) => buildRoutes(scope))
      .flat(Infinity);
  }

  // recognize(request) {
  // }

  /**
   * @param {any} name
   * @param {any[]} params
   */
  route(name, ...params) {
    const route = this.routes.find((r) => r.name === name);
    if (!route) {
      throw Error(`Route with name '${name}' not found`);
    }
    // TODO: move mapResourcesToTemplate to Route (prepared regexp for performance purpose)
    return urlJoin(this.host, mapResourcesToTemplate(route.template, params));
  }
}

module.exports = Router;
