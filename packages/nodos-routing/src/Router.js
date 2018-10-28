import _ from 'lodash';
import urlJoin from 'url-join';
import Route from './Route';
import validate from './validator';

const detectRouteType = (currentName) => {
  const names = ['resources', 'resource'];
  return names.find(name => name === currentName);
};

const routesDefaultOnly = ['index', 'new', 'create', 'show', 'edit', 'update', 'destroy'];
const routesDefaultExcept = [];

const buildActionNames = (routeItem) => {
  const onlyNames = _.get(routeItem, 'only', routesDefaultOnly);
  const exceptNames = _.get(routeItem, 'except', routesDefaultExcept);
  return _.difference(onlyNames, exceptNames);
};

const normalizeRouteItem = (valueOrValues) => {
  const routeItem = _.isObject(valueOrValues) ? valueOrValues : { name: valueOrValues };

  return {
    ...routeItem,
    actionNames: buildActionNames(routeItem),
  };
};

const selectRequestedActions = (routeItem, actions) => {
  const { actionNames } = routeItem;
  return actions.filter(action => actionNames.includes(action.name));
};

const types = {
  resources: (routeItem, rec, { path, middlewares, parent }) => {
    const getParentPath = (parent) => {
      const { path, resourceName } = parent;
      return urlJoin(path, resourceName, `:${resourceName.slice(0, -1)}_id`);
    };

    const buildUrl = u => urlJoin(path, routeItem.name, u);
    const actions = [
      { name: 'index', method: 'get', url: buildUrl('') },
      { name: 'new', method: 'get', url: buildUrl('new') },
      { name: 'create', method: 'post', url: buildUrl('') },
      { name: 'show', method: 'get', url: buildUrl(':id') },
      { name: 'edit', method: 'get', url: buildUrl(':id/edit') },
      { name: 'update', method: 'patch', url: buildUrl(':id') },
      { name: 'update', method: 'put', url: buildUrl(':id') },
      { name: 'destroy', method: 'delete', url: buildUrl(':id') },
    ];

    const route = new Route({
      middlewares,
      path,
      parent,
      resourceName: routeItem.name,
      actions: selectRequestedActions(routeItem, actions),
    });

    const nestedRoutes = routeItem.routes
      ? buildRoutes(routeItem.routes, { path: getParentPath(route), middlewares, parent: route })
      : [];

    return [route, ...nestedRoutes];
  },
  resource: (routeItem, rec, { path, middlewares, parent }) => {
    const buildUrl = u => urlJoin(path, routeItem.name, u);
    const actions = [
      { name: 'new', method: 'get', url: buildUrl('new') },
      { name: 'create', method: 'post', url: buildUrl('') },
      { name: 'show', method: 'get', url: buildUrl('') },
      { name: 'edit', method: 'get', url: buildUrl('edit') },
      { name: 'update', method: 'patch', url: buildUrl('') },
      { name: 'update', method: 'put', url: buildUrl('') },
      { name: 'destroy', method: 'delete', url: buildUrl('') },
    ];

    const route = new Route({
      middlewares,
      path,
      parent,
      resourceName: routeItem.name,
      actions: selectRequestedActions(routeItem, actions),
    });

    const nestedRoutes = routeItem.routes
      ? buildRoutes(routeItem.routes, { path: buildUrl(''), middlewares, parent: route })
      : [];

    return [route, ...nestedRoutes];
  },
};

export const buildRoutes = (routes, options) => routes.map((item) => {
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
}
