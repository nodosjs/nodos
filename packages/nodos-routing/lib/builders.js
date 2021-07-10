// @ts-check

const urlJoin = require('url-join');
const {
  singularize, camelize, pluralize,
} = require('inflected');
const _ = require('lodash');
const path = require('path');
// const log = require('./logger.js');
const { getOrError } = require('./utils.js');
const Route = require('./Route.js');

const resourcesActionNames = ['index', 'build', 'create', 'show', 'edit', 'update', 'destroy'];
const resourceActionNames = ['build', 'create', 'show', 'edit', 'update', 'destroy'];

const buildRouteInfo = (options) => ({
  controllerName: '',
  prefix: '',
  suffix: '',
  ...options,
});

const buildResourcesInfo = (/** @type {any} */ options) => ({
  only: resourcesActionNames,
  controllerName: pluralize(options.name),
  parentSuffix: `${options.name}/:${singularize(options.name)}_id`,
  routes: [],
  collection: [],
  member: [],
  except: [],
  ...options,
});

const buildResourceInfo = (/** @type {any} */ options) => ({
  routes: [],
  collection: [],
  member: [],
  controllerName: pluralize(options.name),
  only: resourceActionNames,
  parentSuffix: options.name,
  except: [],
  ...options,
});

const getControllerPath = (
  /** @type {any} */ scope,
  /** @type {{ name?: string; suffix: string; prefix: string; controllerName: string; }} */ routeInfo,
) => {
  const { controllerName } = scope.parentResourceInfo;
  const fullPath = path.join(scope.path, controllerName, routeInfo.controllerName);
  return fullPath;
};

const getTemplate = (
  /** @type {any} */ scope,
  /** @type {{ name?: string; suffix: string; prefix: string; }} */ routeInfo,
) => {
  // log('getTemplate', routeInfo);
  const { parentSuffix = '' } = scope.parentResourceInfo;
  const fullUrl = urlJoin(scope.path, parentSuffix, routeInfo.suffix, routeInfo.prefix);
  return fullUrl || '/';
};

const getRouteName = (
  /** @type {any} */ scope,
  /** @type {{ name: string; suffix?: string; prefix: string; }} */ routeInfo,
) => {
  const parentName = scope.parentResourceInfo.name ? singularize(scope.parentResourceInfo.name) : '';
  const words = [routeInfo.prefix, scope.name, parentName, routeInfo.name].filter((w) => w).join('_');
  return camelize(words, false);
};

const buildCollectionRoutes = (scope, { name, collection }) => {
  const controllerName = pluralize(name);
  const buildCollectionRoute = (/** @type {any} */ collection) => {
    const [method, actionName] = Object.entries(collection)[0];
    const routeInfo = buildRouteInfo({
      name,
      suffix: name,
      prefix: actionName,
      controllerName,
    });

    return new Route(scope, {
      actionName,
      controllerName,
      method,
      name: getRouteName(scope, routeInfo),
      template: getTemplate(scope, routeInfo),
      controllerPath: getControllerPath(scope, routeInfo),
    });
  };

  return collection.map(buildCollectionRoute);
};

const buildMemberRoutes = (scope, { name, member }) => {
  const controllerName = pluralize(name);
  const buildMemberRoute = (/** @type {any} */ member) => {
    const [method, actionName] = Object.entries(member)[0];
    const routeInfo = buildRouteInfo({
      name: singularize(name),
      suffix: `${name}/:id`,
      prefix: actionName,
      controllerName,
    });

    return new Route(scope, {
      actionName,
      controllerName,
      method,
      name: getRouteName(scope, routeInfo),
      template: getTemplate(scope, routeInfo),
      controllerPath: getControllerPath(scope, routeInfo),
    });
  };

  return member.map(buildMemberRoute);
};

const buildRoot = (value, scope) => {
  const [controllerName, actionName] = value.split('#');
  const routeInfo = buildRouteInfo({ name: 'root', controllerName });

  const route = new Route(scope, {
    controllerName,
    // path: urlJoin(scope.path, controllerName),
    // prefix,
    actionName,
    method: 'get',
    template: getTemplate(scope, routeInfo),
    name: getRouteName(scope, routeInfo),
    controllerPath: getControllerPath(scope, routeInfo),
  });

  return route;
};

const buildResources = (value, rec, scope) => {
  const data = value instanceof Object ? value : { name: value };
  const resourceInfo = buildResourcesInfo(data);

  const controllerName = pluralize(resourceInfo.name);

  const actionDataBuilders = {
    index: () => {
      const actionName = 'index';
      const routeInfo = buildRouteInfo({
        name: resourceInfo.name,
        suffix: resourceInfo.name,
        controllerName,
      });

      return {
        actionName,
        controllerName,
        method: 'get',
        template: getTemplate(scope, routeInfo),
        name: getRouteName(scope, routeInfo),
        controllerPath: getControllerPath(scope, routeInfo),
      };
    },
    build: () => {
      const actionName = 'build';
      const routeInfo = buildRouteInfo({
        name: singularize(resourceInfo.name),
        suffix: resourceInfo.name,
        controllerName,
        prefix: actionName,
      });

      return {
        actionName,
        controllerName,
        method: 'get',
        template: getTemplate(scope, routeInfo),
        name: getRouteName(scope, routeInfo),
        controllerPath: getControllerPath(scope, routeInfo),
      };
    },
    create: () => {
      const routeInfo = buildRouteInfo({
        name: resourceInfo.name,
        suffix: resourceInfo.name,
        controllerName,
      });

      return {
        actionName: 'create',
        controllerName,
        method: 'post',
        template: getTemplate(scope, routeInfo),
        // name: getRouteName(scope, routeInfo),
        controllerPath: getControllerPath(scope, routeInfo),
      };
    },

    show: () => {
      const name = singularize(resourceInfo.name);
      const routeInfo = buildRouteInfo({
        controllerName,
        name,
        suffix: `${resourceInfo.name}/:id`,
      });

      return {
        actionName: 'show',
        controllerName,
        method: 'get',
        template: getTemplate(scope, routeInfo),
        name: getRouteName(scope, routeInfo),
        controllerPath: getControllerPath(scope, routeInfo),
      };
    },

    edit: () => {
      const actionName = 'edit';
      const routeInfo = buildRouteInfo({
        name: singularize(resourceInfo.name),
        prefix: actionName,
        suffix: `${resourceInfo.name}/:id`,
        controllerName,
      });

      return {
        actionName,
        controllerName,
        method: 'get',
        template: getTemplate(scope, routeInfo),
        name: getRouteName(scope, routeInfo),
        controllerPath: getControllerPath(scope, routeInfo),
      };
    },

    update: () => {
      const actionName = 'update';
      const routeInfo = buildRouteInfo({
        name: singularize(resourceInfo.name),
        prefix: actionName,
        suffix: `${resourceInfo.name}/:id`,
        controllerName,
      });

      return {
        actionName,
        controllerName,
        method: 'patch',
        template: getTemplate(scope, routeInfo),
        // name: getRouteName(scope, routeInfo),
        controllerPath: getControllerPath(scope, routeInfo),
      };
    },

    destroy: () => {
      const actionName = 'destroy';
      const routeInfo = buildRouteInfo({
        name: singularize(resourceInfo.name),
        suffix: `${resourceInfo.name}/:id`,
        controllerName,
      });

      return {
        actionName,
        controllerName,
        method: 'delete',
        template: getTemplate(scope, routeInfo),
        // name: getRouteName(scope, routeInfo),
        controllerPath: getControllerPath(scope, routeInfo),
      };
    },
  };

  const actionNames = _.difference(resourceInfo.only, resourceInfo.except);

  const routes = actionNames.map((n) => {
    const options = getOrError(actionDataBuilders, n)();
    return new Route(scope, options);
  });

  let nestedRoutes = [];
  if (resourceInfo.routes.length > 0) {
    const nestedScope = {
      ...scope,
      parentResourceInfo: resourceInfo,
      routes: resourceInfo.routes,
    };
    nestedRoutes = rec(nestedScope);
  }

  const collectionRoutes = buildCollectionRoutes(scope, resourceInfo);
  const memberRoutes = buildMemberRoutes(scope, resourceInfo);

  return [
    ...routes,
    ...memberRoutes,
    ...collectionRoutes,
    ...nestedRoutes
  ];
};

const buildResource = (value, rec, scope) => {
  const data = value instanceof Object ? value : { name: value };
  const resourceInfo = buildResourceInfo(data);

  const controllerName = pluralize(resourceInfo.name);

  const actionDataBuilders = {
    build: () => {
      const actionName = 'build';
      const routeInfo = buildRouteInfo({
        name: singularize(resourceInfo.name),
        suffix: resourceInfo.name,
        prefix: actionName,
        controllerName,
      });

      return {
        actionName,
        controllerName,
        method: 'get',
        template: getTemplate(scope, routeInfo),
        name: getRouteName(scope, routeInfo),
        controllerPath: getControllerPath(scope, routeInfo),
      };
    },
    create: () => {
      const routeInfo = buildRouteInfo({
        name: resourceInfo.name,
        suffix: resourceInfo.name,
        controllerName,
      });

      return {
        actionName: 'create',
        controllerName,
        method: 'post',
        template: getTemplate(scope, routeInfo),
        // name: getRouteName(scope, routeInfo),
        controllerPath: getControllerPath(scope, routeInfo),
      };
    },

    show: () => {
      const actionName = 'show';
      const routeInfo = buildRouteInfo({
        suffix: resourceInfo.name,
        name: resourceInfo.name,
        controllerName,
      });

      return {
        actionName,
        controllerName,
        method: 'get',
        template: getTemplate(scope, routeInfo),
        name: getRouteName(scope, routeInfo),
        controllerPath: getControllerPath(scope, routeInfo),
      };
    },

    edit: () => {
      const actionName = 'edit';
      const routeInfo = buildRouteInfo({
        name: resourceInfo.name,
        prefix: actionName,
        suffix: resourceInfo.name,
        controllerName,
      });

      return {
        actionName,
        controllerName,
        method: 'get',
        template: getTemplate(scope, routeInfo),
        name: getRouteName(scope, routeInfo),
        controllerPath: getControllerPath(scope, routeInfo),
      };
    },

    update: () => {
      const actionName = 'update';

      const routeInfo = buildRouteInfo({
        name: resourceInfo.name,
        suffix: resourceInfo.name,
        controllerName,
      });

      return {
        actionName,
        controllerName,
        method: 'patch',
        template: getTemplate(scope, routeInfo),
        controllerPath: getControllerPath(scope, routeInfo),
        // name: getRouteName(prefix, parent, routeItem.name, 'update'),
      };
    },

    destroy: () => {
      const actionName = 'destroy';

      const routeInfo = buildRouteInfo({
        name: resourceInfo.name,
        suffix: resourceInfo.name,
        controllerName,
      });

      return {
        actionName,
        controllerName,
        method: 'delete',
        template: getTemplate(scope, routeInfo),
        controllerPath: getControllerPath(scope, routeInfo),
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

module.exports = {
  buildRoot,
  buildResources,
  buildResource,
};
