export default class Application {
  constructor({ fastify, config, router }) {
    this.fastify = fastify;
    this.config = config;
    this.router = router;
  }

  listen(...args) {
    return this.fastify.listen(...args);
  }

  get = url => this.request('GET', url)

  post(url) {
    return this.request('POST', url);
  }

  put(url) {
    return this.request('PUT', url);
  }

  patch(url) {
    return this.request('PATCH', url);
  }

  delete(url) {
    return this.request('DELETE', url);
  }

  request(method, url) {
    return this.fastify.inject({
      method,
      url,
    });
  }

  printRoutes() {
    console.log(this.router.formatRoutesForConsole(this.router.printRoutes));
  }
}
