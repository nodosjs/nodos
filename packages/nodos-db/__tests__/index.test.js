import { BaseApplication } from '@nodosjs/application';
import getExtensionData from '../lib';

// TODO: create app in fixtures
class MyApplication extends BaseApplication {
  init() {
    this.config.db = {
      type: 'sqlite',
      database: '/tmp/test.sqlite3',
      logging: false,
    };
  }
}


test('nodos/db', async () => {
  const app = new MyApplication('.');
  await app.init();
  await getExtensionData(app);
});
