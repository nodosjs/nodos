// @ts-check

const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

const fastify = require('fastify');
const fastifySensible = require('fastify-sensible');
const fastifyStatic = require('fastify-static');
const fastifyExpress = require('fastify-express');
const findUp = require('find-up');
// const { merge } = require('lodash');

const buildNodosRouter = require('./builders/nodosRouter.js');
const buildFastifyHandlers = require('./builders/fastifyHandlers.js');
const log = require('./logger.js');
const { requireDefaultFunction } = require('./utils.js');

/**
 * A nodos application object
 * @param {string} projectRoot
 * @param {string} env
 */
class Application {
  addCommandBuilder(buildComand) {
    this.commandBuilders.push(buildComand);
  }

  /**
   * Add fastify plugin
   *
   * @param {import('fastify').FastifyPlugin} plugin
   * @param {Object} options Plugin options
   * @example
   * import formbody from 'fastify-formbody';
   * app.addPlugin(formbody);
   */
  // addPlugin(plugin, options = {}) {
  //   log('addPlugin', plugin);
  //   this.plugins.push([plugin, options]);
  // }

  addDependency(name, value) {
    log('addDependency', name);
    this.container[name] = value;
  }

  async addMiddleware(filepath) {
    const filename = path.basename(filepath);
    const dirname = path.dirname(filepath);
    const middlewareName = filename.replace(path.extname(filename), '');
    const packageConfigPath = await findUp('package.json', { cwd: dirname });
    // log('!!!', packageConfigPath);
    const packageConfig = await fse.readJson(packageConfigPath);
    // log('addMiddleware package.json', packageConfig);
    const fullMiddlewareName = `${packageConfig.name}/${middlewareName}`;
    log('addMiddleware', fullMiddlewareName, filepath);
    // FIXME: check uniqueness
    this.middlewares[fullMiddlewareName] = filepath;
  }

  addExtension(extension, options = {}) {
    log('addExtension', extension);
    this.extensions.push([extension, options]);
  }

  // addHook(name, value) {
  //   this.hooks[name].push(value);
  // }

  addGenerator(generator) {
    this.generators.push(generator);
  }

  isInitialized() {
    return this.state === 'initialized';
  }

  isDevelopment() {
    return this.config.env === 'development';
  }

  isProduction() {
    return this.config.env !== 'development';
  }

  isTest() {
    return this.config.env === 'test';
  }

  // isConsole() {
  //   return this.config.mode === 'console';
  // }

  // isServer() {
  //   return this.config.mode === 'server';
  // }

  root() {
    return this.config.projectRoot;
  }

  constructor(projectRoot, options = {}) {
    const env = options.env ?? process.env.NODOS_ENV ?? 'development';
    // const mode = options.mode ?? 'server';
    this.defaultRequestOptions = { headers: {}, params: null };
    this.commandBuilders = [];
    this.extensions = [];
    this.middlewares = [];
    this.generators = [];
    this.container = {};
    this.plugins = [];
    this.hooks = {
      onStop: [],
      // onListen: [],
    };

    const join = path.join.bind(null, projectRoot);
    this.config = {
      port: options.port ?? 8080,
      host: 'localhost',
      env,
      // mode,
      projectRoot,
      errorHandler: false,
      paths: {
        publicPath: join('public'),
        routesPath: join('config', 'routes.yml'),
        applicationPath: join('config', 'application.js'),
        configPath: join('config'),
        environmentPath: join(`config/environments/${env}.js`),
        templatesPath: join('app', 'templates'),
        controllersPath: join('app', 'controllers'),
        middlewaresPath: join('app', 'middlewares'),
      },
    };

    this.state = 'created';
  }

  async initApp() {
    const fillByApp = requireDefaultFunction(this.config.paths.applicationPath);
    const fillByEnv = requireDefaultFunction(this.config.paths.environmentPath);

    await fillByApp(this);
    await fillByEnv(this);

    // TODO validate required options like host

    const host = `http://${this.config.host}:${this.config.port}`;
    this.router = await buildNodosRouter(this.config.paths.routesPath, { host });
    this.fastify = fastify({ logger: { prettyPrint: true } });

    this.fastify.register(fastifyExpress);
    this.fastify.register(fastifySensible, { errorHandler: this.config.errorHandler });
    this.fastify.register(fastifyStatic, {
      root: this.config.paths.publicPath,
      // prefix: '/public/', // optional: default '/'
    });

    await Promise.all(this.extensions.map(([f, options]) => f(this, options)));
    const pluginPromises = this.plugins.map(([plugin, options]) => this.fastify.register(plugin, options));
    await Promise.all(pluginPromises);

    const { middlewaresPath } = this.config.paths;
    const filenames = await fs.promises.readdir(middlewaresPath).catch(() => []);
    const filepaths = filenames.map((filename) => path.resolve(middlewaresPath, filename));

    const middlewarePromises = filepaths.map((filepath) => this.addMiddleware(filepath));
    await Promise.all(middlewarePromises);

    await buildFastifyHandlers(this);

    log('CONFIG', this.config);

    // this.hooks.onReady.forEach((h) => h());
    if (this.isTest()) {
      this.fastify.setErrorHandler((error) => {
        // reply.send(error);
        throw error;
      });
    }
    this.state = 'initialized';
  }

  async listen(...args) {
    // log('ON LISTEN');
    // this.hooks.onListen.forEach((h) => h());
    // await this.fastify.ready();
    // log('AFTER READY');
    // this.hooks.afterReady.forEach((h) => h());
    return this.fastify.listen(...args);
  }

  close(...args) {
    // log('ON CLOSE');
    // this.hooks.onClose.forEach((h) => h());
    return this.fastify.close(...args);
  }

  async stop() {
    log('ON STOP');
    await this.fastify.close();
    this.hooks.onStop.forEach((h) => h());
  }

  get(url) {
    return this.request('GET', url);
  }

  post(url, options = {}) {
    return this.request('POST', url, options);
  }

  put(url, options = {}) {
    this.request('PUT', url, options);
  }

  patch(url, options = {}) {
    this.request('PATCH', url, options);
  }

  delete(url) {
    return this.request('DELETE', url);
  }

  request(method, url, options) {
    const { params, headers } = { ...this.defaultRequestOptions, ...options };

    return this.fastify.inject({
      method,
      url,
      headers,
      payload: params,
    });
  }
}

module.exports = Application;
