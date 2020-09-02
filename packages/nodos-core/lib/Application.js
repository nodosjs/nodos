// @ts-check

const fs = require('fs');
const path = require('path');
const buildRouter = require('./builders/routes');
const buildFastify = require('./builders/fastify');
const log = require('./logger');
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
   * Add fastify builder
   *
   * @param {FastifyPlugin} plugin
   * @param {Object} options Plugin options
   * @example
   * import formbody from 'fastify-formbody';
   * app.addPlugin(formbody);
   */
  addPlugin(plugin, options = {}) {
    log('addPlugin', plugin);
    this.plugins.push([plugin, options]);
  }

  addDependency(name, value) {
    log('addDependency', name);
    this.container[name] = value;
  }

  addMiddleware(filepath) {
    const filename = path.basename(filepath);
    const middlewareName = filename.replace(path.extname(filename), '');
    log('addMiddleware', middlewareName, filepath);
    // FIXME: check uniqueness
    this.middlewares[middlewareName] = filepath;
  }

  addExtension(extension, options = {}) {
    log('addExtension', extension);
    this.extensions.push([extension, options]);
  }

  addHook(name, value) {
    this.hooks[name].push(value);
  }

  addGenerator(generator) {
    this.generators.push(generator);
  }

  isDevelopment() {
    return this.env === 'development';
  }

  isProduction() {
    return this.env !== 'development';
  }

  constructor(projectRoot, env = 'development') {
    this.env = env;
    this.defaultRequestOptions = { headers: {}, params: null };
    this.commandBuilders = [];
    this.extensions = [];
    this.middlewares = [];
    this.generators = [];
    this.container = {};
    this.plugins = [];
    this.hooks = {
      onStop: [],
      onReady: [],
    };

    const join = path.join.bind(null, projectRoot);
    this.config = {
      env,
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
  }

  async initApp() {
    const fillByApp = requireDefaultFunction(this.config.paths.applicationPath);
    const fillByEnv = requireDefaultFunction(this.config.paths.environmentPath);

    await fillByEnv(this);
    await fillByApp(this);

    this.router = await buildRouter(this.config.paths.routesPath, { host: this.config.host });
    await Promise.all(this.extensions.map(([f, options]) => f(this, options)));

    const { middlewaresPath } = this.config.paths;
    const filenames = await fs.promises.readdir(middlewaresPath).catch(() => []);
    const filepaths = filenames.map((filename) => path.resolve(middlewaresPath, filename));
    filepaths.forEach((filepath) => this.addMiddleware(filepath));
  }

  async initServer() {
    this.fastify = await buildFastify(this);
    this.hooks.onReady.forEach((h) => h());
    log('CONFIG', this.config);
  }

  listen(...args) {
    log('CONFIG', this.config);
    return this.fastify.listen(...args);
  }

  close(...args) {
    return this.fastify.close(...args);
  }

  stop() {
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
