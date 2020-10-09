// @ts-check

class Request {
  constructor(fastifyRequest) {
    this.fastifyRequest = fastifyRequest;

    return new Proxy(this, {
      get(request, prop) {
        if (prop in request) {
          return request[prop];
        }

        return request.fastifyRequest[prop];
      },
    });
  }

  get body() {
    return this.fastifyRequest.body;
  }

  get query() {
    return this.fastifyRequest.query;
  }

  get headers() {
    return this.fastifyRequest.headers;
  }

  get params() {
    return this.fastifyRequest.params;
  }

  get ip() {
    return this.fastifyRequest.ip;
  }

  get hostname() {
    return this.fastifyRequest.hostname;
  }

  get method() {
    return this.fastifyRequest.method;
  }

  get url() {
    return this.fastifyRequest.url;
  }

  get routeMethod() {
    return this.fastifyRequest.routeMethod;
  }

  get connection() {
    return this.fastifyRequest.connection;
  }
}

module.exports = Request;
