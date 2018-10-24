import { promises as fs } from 'fs';
import yml from 'js-yaml';
import Router from '../src';

test('nodos-routing', async () => {
  const routesData = await fs.readFile(`${__dirname}/__fixtures__/routes.yml`);
  const routesMap = yml.safeLoad(routesData);
  const request = {
    method: 'get',
    url: '/users',
  };
  const router = new Router(routesMap);
  // const route = router.recognize(request);
  expect(router.routes[0]).toMatchObject({
    method: 'get',
  });
});
