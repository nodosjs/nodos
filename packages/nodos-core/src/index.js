// import '@babel/register';
import _ from 'lodash';
import path from 'path';
import fastify from 'fastify';
import fastifySensible from 'fastify-sensible';
import pointOfView from 'point-of-view';
import pug from 'pug';
// import debug from 'debug';
import buildRouter from './routes';
import cli from './cli';
import Application from './Application';
import Response from './http/Response';
import log from './logger';
import * as localCommandBuilders from './commands';

export { cli };

const fetchMiddleware = async (config, middlewareName) => {
  const middleware = await import(path.join(config.paths.middlewares, middlewareName))
    .catch(() => import(path.join(__dirname, 'middlewares', middlewareName)))
    .catch(() => import(middlewareName))
    .catch(() => {
      throw new Error(`Middleware '${middlewareName}' is absent.`);
    });
  return middleware.default;
};

const sendResponse = (response, reply) => {
  log(response);
  Object.keys(response.headers).forEach((name) => {
    reply.header(name, response.headers[name]);
  });

  switch (response.responseType) {
    case 'code':
      reply.code(response.code).send();
      break;
    case 'rendering':
      reply.view(response.template(), response.locals);
      break;
    case 'redirect':
      reply.code(response.code).redirect(response.redirectUrl);
      break;

    default:
      throw new Error(`Unknown responseType: ${response.responseType}`);
  }
};

const buildFastify = async (config, router) => {
  const app = fastify({
    logger: true,
  });
  app.register(fastifySensible);
  const plugins = await Promise.all(config.plugins);
  plugins.map(p => p.default).forEach(app.register);
  // FIXME: move to nodos-templates
  app.register(pointOfView, {
    engine: { pug },
    includeViewExtension: true,
    templates: config.paths.templates,
  });

  app.after(console.log);
  app.ready(console.log);

  // // console.log(router.scopes);
  // const scopePromises = router.scopes.map(async (scope) => {
  //   const promises = scope.middlewares.map(name => fetchMiddleware(config, name));
  //   const middlewares = await Promise.all(promises);
  //   // console.log(middlewares);
  //   middlewares.forEach((middleware) => {
  //     console.log(scope, middlewares);
  //     app.register(middleware, { prefix: scope.path });
  //   });
  // });
  // await Promise.all(scopePromises);

  // FIXME: implement root in nodos-routing
  app.get('/', (request, reply) => {
    request.log.info('Some info about the current request');
    reply.send({ hello: 'world' });
  });

  // console.log(router);
  const promises = router.routes.map(async (route) => {
    const pathToController = path.join(config.paths.controllers, route.resourceName);
    const middlewarePromises = route.middlewares.map(fetchMiddleware.bind(null, config));
    const middlewares = await Promise.all(middlewarePromises);
    const opts = {
      beforeHandler: middlewares,
    };
    app[route.method](route.url, opts, async (request, reply) => {
      // FIXME: enable only for development environment
      const appCacheKeys = Object.keys(require.cache).filter(p => !p.match(/node_modules/));
      appCacheKeys.forEach((item) => { delete require.cache[item]; });
      const controllers = await import(pathToController);
      const response = new Response({ templateDir: route.resourceName, templateName: route.name });
      await controllers[route.name](request, response);
      sendResponse(response, reply);
    });
  });
  await Promise.all(promises);

  return app;
};

const buildConfig = async (projectRootPath) => {
  const join = path.join.bind(null, projectRootPath);
  const config = {
    plugins: [],
    extensions: [],
    env: process.env.NODOS_ENV || 'development',
    paths: {
      routes: join('config', 'routes.yml'),
      application: join('config', 'application'),
      config: join('config'),
      environments: join('config/environments'),
      templates: join('app', 'templates'),
      controllers: join('app', 'controllers'),
      middlewares: join('app', 'middlewares'),
    },
  };

  const configureForApp = await import(config.paths.application);
  const pathToConfigForCurrentStage = path.join(config.paths.environments, `${config.env}.js`);
  const configureForStage = await import(pathToConfigForCurrentStage);
  // FIXME: remove default
  configureForApp.default(config);
  configureForStage.default(config);
  return config;
};

const loadExtensions = async (config) => {
  const extensionModules = await Promise.all(config.extensions);
  const extensions = extensionModules.map(m => m.default);
  const context = { commandBuilders: [] };
  await Promise.all(extensions.map(e => e(context)));
  return context;
};

export const nodos = async (projectRootPath) => {
  const config = await buildConfig(projectRootPath);
  const router = await buildRouter(config);
  const fastifyInstance = await buildFastify(config, router);
  const extensionsData = await loadExtensions(config);
  const commandBuilders = Object.values(localCommandBuilders).concat(extensionsData.commandBuilders);
  console.log(commandBuilders);
  return new Application({
    config, commandBuilders, fastify: fastifyInstance, router,
  });
};
