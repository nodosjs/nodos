import _ from 'lodash';
import urlJoin from 'url-join';
import { singularize, foreignKey } from 'inflected';
import Route from './Route';
import validate from './validator';

const detectRouteType = (currentName) => {
  const names = ['resources', 'resource'];
  return names.find(name => name === currentName);
};

const routesDefaultOnly = ['index', 'new', 'create', 'show', 'edit', 'update', 'destroy'];
const routesDefaultExcept = [];

const buildHandlerNames = (routeItem) => {
  const onlyNames = _.get(routeItem, 'only', routesDefaultOnly);
  const exceptNames = _.get(routeItem, 'except', routesDefaultExcept);
  return _.difference(onlyNames, exceptNames);
};

const normalizeRouteItem = (valueOrValues) => {
  const routeItem = _.isObject(valueOrValues) ? valueOrValues : { name: valueOrValues };
  const routes = routeItem.routes || [];

  return {
    ...routeItem,
    handlerNames: buildHandlerNames(routeItem),
    routes,
  };
};

const selectRequestedHandlers = (routeItem, handlers) => {
  const { handlerNames } = routeItem;
  return handlers.filter(handler => handlerNames.includes(handler.name));
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

    const handlers = [
      {
        name: 'index',
        method: 'get',
        url: urlJoin(path, routeItem.name),
      },
      {
        name: 'new',
        method: 'get',
        url: urlJoin(path, routeItem.name, '/new'),
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

    const requestedHandlers = selectRequestedHandlers(routeItem, handlers);

    const routes = requestedHandlers.map(options => new Route({ ...options, ...sharedData }));
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

    const handlers = [
      {
        name: 'new',
        method: 'get',
        url: urlJoin(path, routeItem.name, '/new'),
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

    const requestedHandlers = selectRequestedHandlers(routeItem, handlers);

    const routes = requestedHandlers.map(options => new Route({ ...options, ...sharedData }));
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
    this.routes = routeMap.scopes.map(scope => buildScope(scope, routeMap.pipelines))
      |> _.flattenDeep;
  }

  // recognize(request) {
  // }
}
