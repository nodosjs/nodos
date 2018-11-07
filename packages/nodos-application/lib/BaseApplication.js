import path from 'path';
import buildRouter from './builders/routes';
import buildFastify from './builders/fastify';

export default class BaseApplication {
  defaultRequestOptions = { headers: {}, params: null };

  commands = [];

  extensions = [];

  generators = [];

  plugins = []

  hooks = {
    onStop: [],
  };

  container = {};

  addCommand = (command) => {
    this.commands.push(command);
  }

  addPlugin = (plugin, options = {}) => {
    this.plugins.push([plugin, options]);
  }

  addDependency = (name, value) => {
    this.container[name] = value;
  }

  addExtension = (extension, options = {}) => {
    this.extensions.push([extension, options]);
  }

  addHook = (name, value) => {
    this.hooks[name].push(value);
  }

  constructor(projectRoot, env) {
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

  async start() {
    await this.init();
    this.router = await buildRouter(this.config.paths.routes);
    await Promise.all(this.extensions.map(([f, options]) => f(this, options)));
    // TODO: pass only data, not application
    this.fastify = await buildFastify(this);
  }

  listen(...args) {
    return this.fastify.listen(...args);
  }

  stop() {
    this.hooks.onStop.forEach(h => h());
  }

  get = url => this.request('GET', url)

  post = (url, options = {}) => this.request('POST', url, options)

  put = (url, options = {}) => this.request('PUT', url, options)

  patch = (url, options = {}) => this.request('PATCH', url, options)

  delete = url => this.request('DELETE', url)

  request = (method, url, options) => {
    const { params, headers } = { ...this.defaultRequestOptions, ...options };

    return this.fastify.inject({
      method,
      url,
      headers,
      payload: params,
    });
  }
}
