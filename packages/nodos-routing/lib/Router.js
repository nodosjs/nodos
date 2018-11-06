import _ from 'lodash';
import urlJoin from 'url-join';
import { singularize, foreignKey } from 'inflected';
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

const normalizeRouteItem = (valueOrValues) => {
  const routeItem = _.isObject(valueOrValues) ? valueOrValues : { name: valueOrValues };
  const routes = routeItem.routes || [];

  return {
    ...routeItem,
    actionNames: buildActionNames(routeItem),
    routes,
  };
};

const selectRequestedActions = (routeItem, actions) => {
  const { actionNames } = routeItem;
  return actions.filter(action => actionNames.includes(action.name));
};

const getForeignKey = (resourceName) => {
  const key = resourceName |> singularize |> foreignKey;
  return `:${key}`;
};

const types = {
  resources: (routeItem, rec, { path, middlewares, pipeline }) => {
    const sharedData = {
      resourceName: routeItem.name,
      middlewares,
      pipeline,
    };

    const actions = [
      {
        name: 'index',
        method: 'get',
        url: urlJoin(path, routeItem.name),
      },
      {
        name: 'build',
        method: 'get',
        url: urlJoin(path, routeItem.name, '/build'),
      },
      {
        name: 'create',
        method: 'post',
        url: urlJoin(path, routeItem.name),
      },
      {
        name: 'show',
        method: 'get',
        url: urlJoin(path, routeItem.name, '/:id'),
      },
      {
        name: 'edit',
        method: 'get',
        url: urlJoin(path, routeItem.name, '/:id/edit'),
      },
      {
        name: 'update',
        method: 'patch',
        url: urlJoin(path, routeItem.name, '/:id'),
      },
      {
        name: 'update',
        method: 'put',
        url: urlJoin(path, routeItem.name, '/:id'),
      },
      {
        name: 'destroy',
        method: 'delete',
        url: urlJoin(path, routeItem.name, '/:id'),
      },
    ];

    const requestedActions = selectRequestedActions(routeItem, actions);

    const routes = requestedActions.map(options => new Route({ ...options, ...sharedData }));
    const nestedPath = urlJoin(path, routeItem.name, getForeignKey(routeItem.name));
    const nestedRoutes = rec(routeItem.routes, { path: nestedPath, middlewares, pipeline });
    return [...routes, ...nestedRoutes];
  },
  resource: (routeItem, rec, { path, middlewares, pipeline }) => {
    const sharedData = {
      resourceName: routeItem.name,
      middlewares,
      pipeline,
    };

    const actions = [
      {
        name: 'build',
        method: 'get',
        url: urlJoin(path, routeItem.name, '/build'),
      },
      {
        name: 'show',
        method: 'get',
        url: urlJoin(path, routeItem.name),
      },
      {
        name: 'edit',
        method: 'get',
        url: urlJoin(path, routeItem.name, '/edit'),
      },
      {
        name: 'update',
        method: 'patch',
        url: urlJoin(path, routeItem.name),
      },
      {
        name: 'update',
        method: 'put',
        url: urlJoin(path, routeItem.name),
      },
      {
        name: 'destroy',
        method: 'delete',
        url: urlJoin(path, routeItem.name),
      },
    ];

    const requestedActions = selectRequestedActions(routeItem, actions);

    const routes = requestedActions.map(options => new Route({ ...options, ...sharedData }));
    const nestedPath = urlJoin(path, routeItem.name);
    const nestedRoutes = rec(routeItem.routes, { path: nestedPath, middlewares, pipeline });
    return [...routes, ...nestedRoutes];
  },

};

const buildRoutes = (routes, options) => routes.map((item) => {
  const typeName = detectRouteType(Object.keys(item)[0]);
  const routeItem = normalizeRouteItem(item[typeName]);
  return types[typeName](routeItem, buildRoutes, options);
});

const buildScope = ({ routes, path, pipeline }, pipelines) => {
  const result = buildRoutes(routes, { path, middlewares: pipelines[pipeline], pipeline });
  return result;
};

export default class Router {
  constructor(routeMap) {
    validate(routeMap);

    this.routeMap = routeMap;
    // console.log(routeMap);
    this.scopes = routeMap.scopes.map(scope => ({
      path: scope.path,
      middlewares: routeMap.pipelines[scope.pipeline],
    }));
    this.routes = routeMap.scopes.map(scope => buildScope(scope, routeMap.pipelines))
      |> _.flattenDeep;
  }

  // recognize(request) {
  // }
}
