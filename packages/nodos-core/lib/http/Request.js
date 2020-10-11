// @ts-check

/**
  * @typedef FastifyRequest
  * @name FastifyRequest
  * @description fastify's original request object
  */

/**
 * A Request object
 * @param {FastifyRequest} fastifyRequest
 */
class Request {
  constructor(fastifyRequest) {
    this.fastifyRequest = fastifyRequest;

    return new Proxy(this, {
      get(request, prop, receiver) {
        const requestObject = Reflect.has(request, prop) ? request : request.fastifyRequest;

        return Reflect.get(requestObject, prop, receiver);
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
