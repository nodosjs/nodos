import fastify from 'fastify';

export default class Application {
  constructor(router) {
    this.router = router;
    this.app = fastify({
      logging: true,
    });
  }

  get(path) {
    request('get', path);
  }
  post(path) {
    request('post', path);
  }
  put(path) {
    request('put', path);
  }
  patch(path) {
    request('patch', path);
  }
  delete(path) {
    request('delete', path);
  }

  request(method, path) {
    console.log('hello');
    // route = router.recognize({ method, path });
  }
}
