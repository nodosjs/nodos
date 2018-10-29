import _ from 'lodash';

export default class Application {
  defaultOptions = { headers: {}, params: {} };

  constructor({ fastify, config, router }) {
    this.fastify = fastify;
    this.config = config;
    this.router = router;
  }

  listen(...args) {
    return this.fastify.listen(...args);
  }

  get = url => this.request('GET', url)

  post(url, options = {}) {
    return this.request('POST', url, options);
  }

  put(url, options = {}) {
    return this.request('PUT', url, options);
  }

  patch(url, options = {}) {
    return this.request('PATCH', url, options);
  }

  delete(url) {
    return this.request('DELETE', url);
  }

  request(method, url, options) {
    const { params, headers } = { ...this.defaultOptions, ...options };

    return this.fastify.inject({
      method,
      url,
      headers,
      payload: params,
    });
  }
}
