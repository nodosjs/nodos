import _ from 'lodash';
import url from 'url';
import Route from './Route';

const buildScope = ({ routes, path, pipeline }, pipelines) => {
  return buildRoutes(routes, { path, middlewares: pipelines[pipeline] });
};

const detectRouteType = (currentName) => {
  const names = ['resources', 'resource'];
  return names.find(name => name === currentName);
}

const normalizeRouteItem = (valueOrValues) => {
  if (_.isObject(valueOrValues)) {
    return valueOrValues;
  }
  return {
    name: valueOrValues,
  };
};

const types = {
  resources: (valueOrValues, rec, { path, middlewares }) => {
    const values = normalizeRouteItem(valueOrValues);
    // FIXME: implement rest of actions
    const actionNames = [
      {
        name: 'index',
        method: 'get',
        url: url.resolve(path, values.name),
        middlewares: middlewares,
      },
    ];
    return actionNames.map(options => new Route(options));
  },
  resource: (valueOrValues, rec, { path, middlewares }) => {
    const values = normalizeRouteItem(valueOrValues);
    // FIXME: implement rest of actions
    const actionNames = [
      {
        name: 'show',
        method: 'get',
        url: url.resolve(path, values.name),
        middlewares: middlewares,
      },
    ];
    return actionNames.map(options => new Route(options));
  },

};

const buildRoutes = (routes, options) => {
  return routes.map((item) => {
    const typeName = detectRouteType(Object.keys(item)[0]);
    const routes = types[typeName](item[typeName], buildRoutes, options);
    return routes;
  });
}

export default class Router {
  constructor(routeMap) {
    this.routeMap = routeMap;
    this.routes = routeMap.scopes.map(scope => buildScope(scope, routeMap.pipelines))
      |> _.flattenDeep;
  }

  recognize(request) {
  }
}
