import _ from 'lodash';
import urlJoin from 'url-join';
import {
  singularize, foreignKey, pluralize, camelize,
} from 'inflected';
import Route from './Route';
import validate from './validator';

const detectRouteType = (currentName) => {
  const names = ['resources', 'resource'];
  return names.find(name => name === currentName);
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

  return {
    ...scope,
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
  const key = resourceName |> singularize |> foreignKey;
  return `:${key}`;
};

const getName = (prefix, parent, resourceName, actionName, actionPrefix = '') => {
  const prepareResourceName = (resourceName, actionName) => {
    const shouldBePlural = ['index', 'create'];
    return resourceName |> (shouldBePlural.includes(actionName) ? pluralize : singularize);
  };

  const parentPrefix = parent ? parent.resourceName |> singularize : '';
  const preparedResourceName = prepareResourceName(resourceName, actionName);
  const words = [actionPrefix, prefix, parentPrefix, preparedResourceName].filter(w => w).join('_');
  return camelize(words, false);
};

const getUrl = (path, prefix, parent, resourceName, postfix = '') => {
  const parentUrl = parent ? urlJoin(parent.resourceName, getForeignKey(parent.resourceName)) : '';
  return urlJoin(path, prefix, parentUrl, resourceName, postfix);
};

const mapResourcesToUrl = (url, params) => {
  const idGenerator = function* (arr) {
    yield* arr;
  };

  const ids = idGenerator(params);
  return url.replace(/:\w+/g, () => ids.next().value);
};

const selectRequestedActions = (routeItem, actions) => {
  const { actionNames } = routeItem;
  return actions.filter(action => actionNames.includes(action.actionName));
};

const types = {
  resources: (routeItem, rec, {
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

    const routes = requestedActions.map(options => new Route({ ...options, ...sharedData }));
    const nestedRoutes = rec(routeItem.routes, {
      path, prefix, middlewares, pipeline, parent: routes.find(r => r.actionName === 'show'),
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

    const routes = requestedActions.map(options => new Route({ ...options, ...sharedData }));
    const nestedRoutes = rec(routeItem.routes, {
      path, prefix: routeItem.name, middlewares, pipeline,
    });
    return [...routes, ...nestedRoutes];
  },
};

const buildRoutes = (routes, options) => routes.map((item) => {
  const typeName = detectRouteType(Object.keys(item)[0]);
  const routeItem = normalizeRouteItem(item[typeName]);
  return types[typeName](routeItem, buildRoutes, options);
});

const buildScope = ({
  routes, path, prefix, pipeline,
}, pipelines) => buildRoutes(routes, {
  path, prefix, middlewares: pipelines[pipeline], pipeline,
});

export default class Router {
  constructor(routeMap, options) {
    validate(routeMap);

    this.host = options.host;
    this.routeMap = routeMap;
    this.scopes = routeMap.scopes.map(({ name, pipeline }) => ({
      name,
      middlewares: routeMap.pipelines[pipeline],
    }));
    this.routes = routeMap.scopes
      .map(scope => normalizeScope(scope))
      .map(scope => buildScope(scope, routeMap.pipelines))
      |> _.flattenDeep;
  }

  // recognize(request) {
  // }

  routePath(name, ...params) {
    const route = this.routes.find(r => r.name === name);
    return mapResourcesToUrl(route.url, params);
  }

  routeUrl(name, ...params) {
    return urlJoin(this.host, this.routePath(name, ...params));
  }
}
