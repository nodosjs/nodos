const _ = require('lodash');
const urlJoin = require('url-join');
const {
  singularize, foreignKey, pluralize, camelize,
} = require('inflected');
const Route = require('./Route.js');
const validate = require('./validator.js');

const detectRouteType = (currentName) => {
  const names = ['resources', 'resource', 'root'];
  return names.find((name) => name === currentName);
};

const routesDefaultOnly = ['index', 'build', 'create', 'show', 'edit', 'update', 'destroy'];
const routesDefaultExcept = [];

const buildActionNames = (routeItem) => {
  const onlyNames = _.get(routeItem, 'only', routesDefaultOnly);
  const exceptNames = _.get(routeItem, 'except', routesDefaultExcept);
  return _.difference(onlyNames, exceptNames);
};

const normalizeScope = (scope) => {
  const path = scope.name.startsWith('/') ? scope.name : '/';
  const prefix = scope.name.startsWith('/') ? '' : scope.name;
  const routes = _.has(scope, 'routes') ? scope.routes : [];

  return {
    ...scope,
    routes,
    path,
    prefix,
  };
};

const normalizeRouteItem = (valueOrValues) => {
  const routeItem = _.isObject(valueOrValues) ? valueOrValues : { name: valueOrValues };
  const routes = routeItem.routes || [];

  return {
    ...routeItem,
    actionNames: buildActionNames(routeItem),
    routes,
  };
};

const getForeignKey = (resourceName) => {
  const key = foreignKey(singularize(resourceName));
  return `:${key}`;
};

const prepareResourceName = (resourceName, actionName) => {
  const shouldBePlural = ['index', 'create'];
  const modify = shouldBePlural.includes(actionName) ? pluralize : singularize;
  return modify(resourceName);
};

const getName = (prefix, parent, resourceName, actionName, actionPrefix = '') => {
  const parentPrefix = parent ? singularize(parent.name) : '';
  const preparedResourceName = prepareResourceName(resourceName, actionName);
  const words = [actionPrefix, prefix, parentPrefix, preparedResourceName].filter((w) => w).join('_');
  return camelize(words, false);
};

const getUrl = (path, prefix, parent, resourceName, postfix = '') => {
  const parentUrl = parent ? urlJoin(parent.resourceName, getForeignKey(parent.resourceName)) : '';
  return urlJoin(path, prefix, parentUrl, resourceName, postfix);
};

const getResourceName = (prefix, parent, route) => [prefix, pluralize(parent?.name || ''), route.name]
  .filter((item) => item)
  .join('/');

const mapResourcesToUrl = (url, params) => {
  const ids = params[Symbol.iterator]();
  return url.replace(/:\w+/g, () => ids.next().value);
};

const selectRequestedActions = (routeItem, actions) => {
  const { actionNames } = routeItem;
  return actions.filter((action) => actionNames.includes(action.actionName));
};

const types = {
  root: (routeItem, rec, {
    path, prefix, middlewares, pipeline, parent,
  }) => new Route({
    resourceName: getResourceName(prefix, parent, routeItem),
    middlewares,
    pipeline,
    path,
    prefix,
    parent,
    actionName: 'default',
    method: 'get',
    url: getUrl(path, prefix, parent, '') || '/',
    name: getName(prefix, parent, routeItem.name),
  }),
  resources: (routeItem, rec, {
    path, prefix, middlewares, pipeline, parent,
  }) => {
    const sharedData = {
      resourceName: getResourceName(prefix, parent, routeItem),
      middlewares,
      pipeline,
      path,
      prefix,
      parent,
    };

    const actions = [
      {
        actionName: 'index',
        method: 'get',
        url: getUrl(path, prefix, parent, routeItem.name),
        name: getName(prefix, parent, routeItem.name, 'index'),
      },
      {
        actionName: 'build',
        method: 'get',
        url: getUrl(path, prefix, parent, routeItem.name, '/build'),
        name: getName(prefix, parent, routeItem.name, 'build', 'build'),
      },
      {
        actionName: 'create',
        method: 'post',
        url: getUrl(path, prefix, parent, routeItem.name),
        name: getName(prefix, parent, routeItem.name, 'create'),
      },
      {
        actionName: 'show',
        method: 'get',
        url: getUrl(path, prefix, parent, routeItem.name, ':id'),
        name: getName(prefix, parent, routeItem.name, 'show'),
      },
      {
        actionName: 'edit',
        method: 'get',
        url: getUrl(path, prefix, parent, routeItem.name, ':id/edit'),
        name: getName(prefix, parent, routeItem.name, 'edit', 'edit'),
      },
      {
        actionName: 'update',
        method: 'patch',
        url: getUrl(path, prefix, parent, routeItem.name, ':id'),
        name: getName(prefix, parent, routeItem.name, 'update'),
      },
      {
        actionName: 'update',
        method: 'put',
        url: getUrl(path, prefix, parent, routeItem.name, ':id'),
        name: getName(prefix, parent, routeItem.name, 'update'),
      },
      {
        actionName: 'destroy',
        method: 'delete',
        url: getUrl(path, prefix, parent, routeItem.name, ':id'),
        name: getName(prefix, parent, routeItem.name, 'destroy'),
      },
    ];

    const requestedActions = selectRequestedActions(routeItem, actions);

    const routes = requestedActions.map((options) => new Route({ ...options, ...sharedData }));
    const nestedRoutes = rec(routeItem.routes, {
      path, prefix, middlewares, pipeline, parent: routes.find((r) => r.actionName === 'show'),
    });
    return [...routes, ...nestedRoutes];
  },
  resource: (routeItem, rec, {
    path, prefix, middlewares, pipeline, parent,
  }) => {
    const sharedData = {
      resourceName: routeItem.name,
      middlewares,
      pipeline,
      path,
      prefix,
      parent,
    };

    const actions = [
      {
        actionName: 'build',
        method: 'get',
        url: getUrl(path, prefix, parent, routeItem.name, '/build'),
        name: getName(prefix, parent, routeItem.name, 'build', 'build'),
      },
      {
        actionName: 'create',
        method: 'post',
        url: getUrl(path, prefix, parent, routeItem.name),
        name: getName(prefix, parent, routeItem.name, 'create'),
      },
      {
        actionName: 'show',
        method: 'get',
        url: getUrl(path, prefix, parent, routeItem.name),
        name: getName(prefix, parent, routeItem.name, 'show'),
      },
      {
        actionName: 'edit',
        method: 'get',
        url: getUrl(path, prefix, parent, routeItem.name, '/edit'),
        name: getName(prefix, parent, routeItem.name, 'edit', 'edit'),
      },
      {
        actionName: 'update',
        method: 'patch',
        url: getUrl(path, prefix, parent, routeItem.name),
        name: getName(prefix, parent, routeItem.name, 'update'),
      },
      {
        actionName: 'update',
        method: 'put',
        url: getUrl(path, prefix, parent, routeItem.name),
        name: getName(prefix, parent, routeItem.name, 'update'),
      },
      {
        actionName: 'destroy',
        method: 'delete',
        url: getUrl(path, prefix, parent, routeItem.name),
        name: getName(prefix, parent, routeItem.name, 'destroy'),
      },
    ];

    const requestedActions = selectRequestedActions(routeItem, actions);

    const routes = requestedActions.map((options) => new Route({ ...options, ...sharedData }));
    const nestedRoutes = rec(routeItem.routes, {
      path, prefix: routeItem.name, middlewares, pipeline,
    });
    return [...routes, ...nestedRoutes];
  },
};

const buildRoute = (route, options, iter) => {
  const typeName = detectRouteType(_.first(Object.keys(route)));
  const routeItem = normalizeRouteItem(route[typeName]);
  return types[typeName](routeItem, iter, options);
};

const buildRoot = (root, options) => (root ? buildRoute({ root: 'root' }, options) : []);

const buildRoutes = (routes, options) => routes.map((item) => buildRoute(item, options, buildRoutes));

const buildScope = ({
  root, routes, path, prefix, pipeline,
}, pipelines) => {
  const options = {
    path, prefix, middlewares: pipelines[pipeline], pipeline,
  };
  return [buildRoot(root, options), buildRoutes(routes, options)];
};

class Router {
  constructor(routeMap, options) {
    validate(routeMap);

    this.host = options.host;
    this.routeMap = routeMap;
    this.scopes = routeMap.scopes.map(({ name, pipeline }) => ({
      name,
      middlewares: routeMap.pipelines[pipeline],
    }));
    this.routes = routeMap.scopes
      .map((scope) => normalizeScope(scope))
      .map((scope) => buildScope(scope, routeMap.pipelines))
      .flat(Infinity);
  }

  // recognize(request) {
  // }

  route(name, ...params) {
    const route = this.routes.find((r) => r.name === name);
    if (!route) {
      throw Error(`Route with name '${name}' not found`);
    }
    return urlJoin(this.host, mapResourcesToUrl(route.url, params));
  }
}

module.exports = Router;
