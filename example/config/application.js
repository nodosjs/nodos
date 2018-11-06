/* eslint-disable no-param-reassign */

import { BaseApplication } from '@nodosjs/application';
import fastifyCookie from 'fastify-cookie';
import fastifyFormbody from 'fastify-formbody';
import nodosDb from '@nodosjs/db';

export default class Application extends BaseApplication {
  init() {
    this.addExtension(nodosDb);
    this.addPlugin(fastifyCookie);
    this.addPlugin(fastifyFormbody);
  }
}
