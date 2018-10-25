import { promises as fs } from 'fs';
import yml from 'js-yaml';
import Router from '../src';

test('nodos-routing', async () => {
  const routesData = await fs.readFile(`${__dirname}/__fixtures__/routes.yml`);
  const routesMap = yml.safeLoad(routesData);
  const router = new Router(routesMap);
  expect(router.routes[0]).toMatchObject({
    method: 'get',
    url: '/api/users',
  });
  expect(router.routes[1]).toMatchObject({
    method: 'get',
    url: '/api/users/new',
  });
  expect(router.routes[2]).toMatchObject({
    method: 'post',
    url: '/api/users',
  });
});

test('nodos-routing throws an error if schema is invalid', async () => {
  const routesData = await fs.readFile(`${__dirname}/__fixtures__/routesWithInvalidSchema.yml`);
  const routesMap = yml.safeLoad(routesData);

  expect(() => new Router(routesMap)).toThrowErrorMatchingSnapshot();
});
