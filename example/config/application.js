/* eslint-disable no-param-reassign */

import { BaseApplication } from '@nodosjs/application';
import nodosDb from '@nodosjs/db';

export default class Application extends BaseApplication {
  init() {
    this.addExtension(nodosDb);
  }
}
