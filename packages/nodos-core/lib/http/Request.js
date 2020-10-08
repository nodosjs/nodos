// @ts-check

class Request {
  constructor(fastifyRequest) {
    return new Proxy(fastifyRequest, {});
  }
}

module.exports = Request;
