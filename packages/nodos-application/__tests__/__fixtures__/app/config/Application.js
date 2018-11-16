import { BaseApplication } from '@nodosjs/application';
import fastifyFlash from '@nodosjs/application/flash';
import fastifyCookie from 'fastify-cookie';
import fastifyFormbody from 'fastify-formbody';
import fastifySession from 'fastify-session';

export default class Application extends BaseApplication {
  init() {
    this.addPlugin(fastifyCookie);
    this.addPlugin(fastifyFormbody);
    this.addPlugin(
      fastifySession,
      {
        secret: this.config.secretKeyBase,
        cookie: {
          secure: false,
        },
      },
    );
    this.addPlugin(fastifyFlash);
  }
}
