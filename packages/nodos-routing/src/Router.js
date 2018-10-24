import _ from 'lodash';
import urlJoin from 'url-join';
import Route from './Route';

const detectRouteType = (currentName) => {
  const names = ['resources', 'resource'];
  return names.find(name => name === currentName);
};

const normalizeRouteItem = (valueOrValues) => {
  if (_.isObject(valueOrValues)) {
    return valueOrValues;
  }
  return {
    name: valueOrValues,
  };
};

const types = {
  resources: (values, rec, { path, middlewares }) => {
    const actionNames = [
      {
        name: 'index',
        resourceName: values.name,
        method: 'get',
        url: urlJoin(path, values.name),
        middlewares,
      },
      {
        name: 'new',
        resourceName: values.name,
        method: 'get',
        url: urlJoin(path, values.name, '/new'),
        middlewares,
      },
      {
        name: 'create',
        resourceName: values.name,
        method: 'post',
        url: urlJoin(path, values.name),
        middlewares,
      },
      {
        name: 'show',
        resourceName: values.name,
        method: 'get',
        url: urlJoin(path, values.name, '/:id'),
        middlewares,
      },
      {
        name: 'edit',
        resourceName: values.name,
        method: 'get',
        url: urlJoin(path, values.name, '/:id/edit'),
        middlewares,
      },
      {
        name: 'update',
        resourceName: values.name,
        method: 'patch',
        url: urlJoin(path, values.name, '/:id'),
        middlewares,
      },
      {
        name: 'update',
        resourceName: values.name,
        method: 'put',
        url: urlJoin(path, values.name, '/:id'),
        middlewares,
      },
      {
        name: 'destroy',
        resourceName: values.name,
        method: 'delete',
        url: urlJoin(path, values.name, '/:id'),
        middlewares,
      },
    ];
    return actionNames.map(options => new Route(options));
  },
  resource: (values, rec, { path, middlewares }) => {
    const actionNames = [
      {
        name: 'new',
        resourceName: values.name,
        method: 'get',
        url: urlJoin(path, values.name, '/new'),
        middlewares,
      },
      {
        name: 'show',
        resourceName: values.name,
        method: 'get',
        url: urlJoin(path, values.name),
        middlewares,
      },
      {
        name: 'edit',
        resourceName: values.name,
        method: 'get',
        url: urlJoin(path, values.name, '/edit'),
        middlewares,
      },
      {
        name: 'update',
        resourceName: values.name,
        method: 'patch',
        url: urlJoin(path, values.name),
        middlewares,
      },
      {
        name: 'update',
        resourceName: values.name,
        method: 'put',
        url: urlJoin(path, values.name),
        middlewares,
      },
      {
        name: 'destroy',
        resourceName: values.name,
        method: 'delete',
        url: urlJoin(path, values.name),
        middlewares,
      },

    ];
    return actionNames.map(options => new Route(options));
  },

};

const buildRoutes = (routes, options) => routes.map((item) => {
  const typeName = detectRouteType(Object.keys(item)[0]);
  const values = normalizeRouteItem(item[typeName]);
  const routes = types[typeName](values, buildRoutes, options);
  return routes;
});

const buildScope = ({ routes, path, pipeline }, pipelines) => buildRoutes(routes, { path, middlewares: pipelines[pipeline] });

export default class Router {
  constructor(routeMap) {
    this.routeMap = routeMap;
    this.routes = routeMap.scopes.map(scope => buildScope(scope, routeMap.pipelines))
      |> _.flattenDeep;
  }

  recognize(request) {
  }
}
