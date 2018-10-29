import _ from 'lodash';
import urlJoin from 'url-join';
import Route from './Route';
import validate from './validator';
import { formatRoutesForConsole } from './formatter';

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

  return {
    ...routeItem,
    handlerNames: buildHandlerNames(routeItem),
  };
};

const selectRequestedHandlers = (routeItem, handlers) => {
  const { handlerNames } = routeItem;
  return handlers.filter(handler => handlerNames.includes(handler.name));
};

const types = {
  resources: (routeItem, rec, { path, middlewares }) => {
    const handlers = [
      {
        name: 'index',
        resourceName: routeItem.name,
        method: 'get',
        url: urlJoin(path, routeItem.name),
        middlewares,
      },
      {
        name: 'new',
        resourceName: routeItem.name,
        method: 'get',
        url: urlJoin(path, routeItem.name, '/new'),
        middlewares,
      },
      {
        name: 'create',
        resourceName: routeItem.name,
        method: 'post',
        url: urlJoin(path, routeItem.name),
        middlewares,
      },
      {
        name: 'show',
        resourceName: routeItem.name,
        method: 'get',
        url: urlJoin(path, routeItem.name, '/:id'),
        middlewares,
      },
      {
        name: 'edit',
        resourceName: routeItem.name,
        method: 'get',
        url: urlJoin(path, routeItem.name, '/:id/edit'),
        middlewares,
      },
      {
        name: 'update',
        resourceName: routeItem.name,
        method: 'patch',
        url: urlJoin(path, routeItem.name, '/:id'),
        middlewares,
      },
      {
        name: 'update',
        resourceName: routeItem.name,
        method: 'put',
        url: urlJoin(path, routeItem.name, '/:id'),
        middlewares,
      },
      {
        name: 'destroy',
        resourceName: routeItem.name,
        method: 'delete',
        url: urlJoin(path, routeItem.name, '/:id'),
        middlewares,
      },
    ];

    const requestedHandlers = selectRequestedHandlers(routeItem, handlers);

    return requestedHandlers.map(options => new Route(options));
  },
  resource: (routeItem, rec, { path, middlewares }) => {
    const handlers = [
      {
        name: 'new',
        resourceName: routeItem.name,
        method: 'get',
        url: urlJoin(path, routeItem.name, '/new'),
        middlewares,
      },
      {
        name: 'show',
        resourceName: routeItem.name,
        method: 'get',
        url: urlJoin(path, routeItem.name),
        middlewares,
      },
      {
        name: 'edit',
        resourceName: routeItem.name,
        method: 'get',
        url: urlJoin(path, routeItem.name, '/edit'),
        middlewares,
      },
      {
        name: 'update',
        resourceName: routeItem.name,
        method: 'patch',
        url: urlJoin(path, routeItem.name),
        middlewares,
      },
      {
        name: 'update',
        resourceName: routeItem.name,
        method: 'put',
        url: urlJoin(path, routeItem.name),
        middlewares,
      },
      {
        name: 'destroy',
        resourceName: routeItem.name,
        method: 'delete',
        url: urlJoin(path, routeItem.name),
        middlewares,
      },

    ];

    const requestedHandlers = selectRequestedHandlers(routeItem, handlers);

    return requestedHandlers.map(options => new Route(options));
  },

};

const buildRoutes = (routes, options) => routes.map((item) => {
  const typeName = detectRouteType(Object.keys(item)[0]);
  const routeItem = normalizeRouteItem(item[typeName]);
  return types[typeName](routeItem, buildRoutes, options);
});

const buildScope = ({ routes, path, pipeline }, pipelines) => {
  const result = buildRoutes(routes, { path, middlewares: pipelines[pipeline] });
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

  formatRoutesForConsole() {
    return formatRoutesForConsole(this.routes);
  }
}
