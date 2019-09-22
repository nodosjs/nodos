import { BaseApplication } from '../../../lib';
import fastifyCookie from 'fastify-cookie';
import fastifyFormbody from 'fastify-formbody';

export default class Application extends BaseApplication {
  init() {
    this.addPlugin(fastifyCookie);
    this.addPlugin(fastifyFormbody);
  }
}
