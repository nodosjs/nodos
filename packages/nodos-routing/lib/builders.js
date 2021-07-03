// @ts-check

const urlJoin = require('url-join');
const {
  singularize, camelize,
} = require('inflected');
const _ = require('lodash');
const log = require('./logger.js');
const { getOrError } = require('./utils.js');
const Route = require('./Route.js');

const resourcesActionNames = ['index', 'build', 'create', 'show', 'edit', 'update', 'destroy'];
const resourceActionNames = ['build', 'create', 'show', 'edit', 'update', 'destroy'];

const buildRouteInfo = (/** @type {{ name: any; suffix?: any; actionName?: string; }} */ options) => ({
  actionName: '',
  suffix: '',
  ...options,
});

const buildResourcesInfo = (/** @type {any} */ options) => ({
  only: resourcesActionNames,
  parentSuffix: `${options.name}/:${singularize(options.name)}_id`,
  except: [],
  ...options,
});

const buildResourceInfo = (/** @type {any} */ options) => ({
  only: resourceActionNames,
  parentSuffix: options.name,
  except: [],
  ...options,
});

const getTemplate = (
  /** @type {any} */ scope,
  /** @type {{ name?: string; suffix: string; actionName: string; }} */ routeInfo,
) => {
  log('getTemplate', routeInfo);
  const { parentSuffix = '' } = scope.parentResourceInfo;
  const fullUrl = urlJoin(scope.path, parentSuffix, routeInfo.suffix, routeInfo.actionName);
  return fullUrl;
};

const getRouteName = (
  /** @type {any} */ scope,
  /** @type {{ name: string; suffix?: string; actionName: string; }} */ routeInfo,
) => {
  const parentName = scope.parentResourceInfo.name ? singularize(scope.parentResourceInfo.name) : '';
  const words = [routeInfo.actionName, scope.name, parentName, routeInfo.name].filter((w) => w).join('_');
  return camelize(words, false);
};

export const buildRoot = (value, scope) => {
  const { path } = scope;
  const [controllerName, actionName] = value.split('#');
  const routeInfo = buildRouteInfo({ name: 'root' });

  const route = new Route(scope, {
    controllerName,
    path: urlJoin(path, controllerName),
    // prefix,
    actionName,
    method: 'get',
    template: getTemplate(scope, routeInfo),
    name: getRouteName(scope, routeInfo),
  });

  return route;
};

export const buildResources = (value, rec, scope) => {
  const data = value instanceof Object ? value : { name: value };
  const resourceInfo = buildResourcesInfo(data);

  const { path } = scope;

  const prefix = urlJoin(path);

  const actionDataBuilders = {
    index: () => {
      const routeInfo = buildRouteInfo({ name: resourceInfo.name, suffix: resourceInfo.name });
      return {
        method: 'get',
        template: getTemplate(scope, routeInfo),
        name: getRouteName(scope, routeInfo),
      };
    },
    build: () => {
      const actionName = 'build';
      const routeInfo = buildRouteInfo({
        name: singularize(resourceInfo.name), suffix: resourceInfo.name, actionName,
      });
      return {
        actionName,
        method: 'get',
        template: getTemplate(scope, routeInfo),
        name: getRouteName(scope, routeInfo),
      };
    },
    create: () => {
      const routeInfo = buildRouteInfo({
        name: resourceInfo.name, suffix: resourceInfo.name,
      });

      return {
        actionName: 'create',
        method: 'post',
        template: getTemplate(scope, routeInfo),
        name: getRouteName(scope, routeInfo),
      };
    },

    show: () => {
      const name = singularize(resourceInfo.name);
      const routeInfo = buildRouteInfo({
        name, suffix: `${resourceInfo.name}/:id`,
      });

      return {
        actionName: 'show',
        method: 'get',
        template: getTemplate(scope, routeInfo),
        name: getRouteName(scope, routeInfo),
      };
    },

    edit: () => {
      const actionName = 'edit';
      const routeInfo = buildRouteInfo({
        name: singularize(resourceInfo.name), actionName, suffix: `${resourceInfo.name}/:id`,
      });

      return {
        actionName,
        method: 'get',
        template: getTemplate(scope, routeInfo),
        name: getRouteName(scope, routeInfo),
      };
    },

    update: () => ({
      actionName: 'update',
      method: 'patch',
      template: urlJoin(prefix, ':id'),
      // name: getRouteName(prefix, parent, routeItem.name, 'update'),
    }),

    destroy: () => ({
      actionName: 'destroy',
      method: 'delete',
      template: urlJoin(prefix, ':id'),
      // name: getRouteName(prefix, parent, routeItem.name, 'destroy'),
    }),
  };

  const actionNames = _.difference(resourceInfo.only, resourceInfo.except);

  const routes = actionNames.map((n) => {
    const options = getOrError(actionDataBuilders, n)();
    const route = new Route(scope, options);
    return route;
  });

  let nestedRoutes = [];
  if (_.has(resourceInfo, 'routes')) {
    const nestedScope = {
      ...scope,
      parentResourceInfo: resourceInfo,
      routes: resourceInfo.routes,
    };
    nestedRoutes = rec(nestedScope);
  }

  return [...routes, ...nestedRoutes];
};

export const buildResource = (value, rec, scope) => {
  const data = value instanceof Object ? value : { name: value };
  const resourceInfo = buildResourceInfo(data);

  const actionDataBuilders = {
    build: () => {
      const actionName = 'build';
      const routeInfo = buildRouteInfo({
        name: singularize(resourceInfo.name), suffix: resourceInfo.name, actionName,
      });
      return {
        actionName,
        method: 'get',
        template: getTemplate(scope, routeInfo),
        name: getRouteName(scope, routeInfo),
      };
    },
    create: () => {
      const routeInfo = buildRouteInfo({
        name: resourceInfo.name, suffix: resourceInfo.name,
      });

      return {
        actionName: 'create',
        method: 'post',
        template: getTemplate(scope, routeInfo),
        name: getRouteName(scope, routeInfo),
      };
    },

    show: () => {
      const actionName = 'show';
      const routeInfo = buildRouteInfo({
        name: resourceInfo,
      });

      return {
        actionName,
        method: 'get',
        template: getTemplate(scope, routeInfo),
        name: getRouteName(scope, routeInfo),
      };
    },

    edit: () => {
      const actionName = 'edit';
      const routeInfo = buildRouteInfo({
        name: resourceInfo.name, actionName, suffix: resourceInfo.name,
      });

      return {
        actionName,
        method: 'get',
        template: getTemplate(scope, routeInfo),
        name: getRouteName(scope, routeInfo),
      };
    },

    update: () => {
      const actionName = 'update';

      const routeInfo = buildRouteInfo({
        name: resourceInfo.name, suffix: resourceInfo.name,
      });

      return {
        actionName,
        method: 'patch',
        template: getTemplate(scope, routeInfo),
        // name: getRouteName(prefix, parent, routeItem.name, 'update'),
      };
    },

    destroy: () => {
      const actionName = 'destroy';

      const routeInfo = buildRouteInfo({
        name: resourceInfo.name, suffix: resourceInfo.name,
      });
      return {
        actionName,
        method: 'delete',
        template: getTemplate(scope, routeInfo),
        // name: getRouteName(prefix, parent, routeItem.name, 'destroy'),
      };
    },

  };

  const actionNames = _.difference(resourceInfo.only, resourceInfo.except);

  const routes = actionNames.map((n) => {
    const options = getOrError(actionDataBuilders, n)();
    const route = new Route(scope, options);
    return route;
  });

  let nestedRoutes = [];
  if (_.has(resourceInfo, 'routes')) {
    const nestedScope = {
      ...scope,
      parentResourceInfo: resourceInfo,
      routes: resourceInfo.routes,
    };
    nestedRoutes = rec(nestedScope);
  }

  return [...routes, ...nestedRoutes];
};
