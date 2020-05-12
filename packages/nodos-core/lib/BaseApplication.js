const path = require('path');
const buildRouter = require('./builders/routes');
const buildFastify = require('./builders/fastify');
const log = require('./logger');

class BaseApplication {
  addCommand(command) {
    this.commands.push(command);
  }

  addPlugin(plugin, options = {}) {
    this.plugins.push([plugin, options]);
  }

  addDependency(name, value) {
    this.container[name] = value;
  }

  addExtension(extension, options = {}) {
    this.extensions.push([extension, options]);
  }

  addHook(name, value) {
    this.hooks[name].push(value);
  }

  constructor(projectRoot, env) {
    this.defaultRequestOptions = { headers: {}, params: null };
    this.commands = [];
    this.extensions = [];
    this.generators = [];
    this.container = {};
    this.plugins = []
    this.hooks = {
      onStop: [],
    };

    const join = path.join.bind(null, projectRoot);
    this.config = {
      env,
      projectRoot,
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
  }

  async init() { }

  async start() {
    await this.init();
    this.router = await buildRouter(this.config.paths.routes, { host: this.config.host });
    this.addDependency('router', this.router);
    await Promise.all(this.extensions.map(([f, options]) => f(this, options)));
    // TODO: pass only data, not application
    this.fastify = await buildFastify(this);
    log('CONFIG', this.config);
  }

  listen(...args) {
    return this.fastify.listen(...args);
  }

  stop() {
    this.hooks.onStop.forEach(h => h());
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

module.exports = BaseApplication;
