import { promises as fs } from 'fs';
import _ from 'lodash';
import yml from 'js-yaml';
import Router from '../src';

test('nodos-routing', async () => {
  const routesData = await fs.readFile(`${__dirname}/__fixtures__/routes.yml`);
  const routesMap = yml.safeLoad(routesData);
  const router = new Router(routesMap);

  const expectedRoutes = [
    { url: '/api/users', method: 'get' },
    { url: '/api/users/new', method: 'get' },
    { url: '/api/users', method: 'post' },
    { url: '/api/users/:id', method: 'get' },
    { url: '/users/:id', method: 'get' },
    { url: '/articles', method: 'get' },
    { url: '/articles/:id', method: 'patch' },
  ];

  const actualRoutes = router.routes
    .map(({ url, method }) => ({ url, method }))
    .filter(r => expectedRoutes.find(e => _.isEqual(e, r)));

  expect(expectedRoutes).toEqual(actualRoutes);

  // Only
  const userRootRoutes = router.routes.filter(route => route.url.startsWith('/users'));

  expect(userRootRoutes).toHaveLength(1);
  expect(userRootRoutes[0]).toMatchObject({
    method: 'get',
    name: 'show',
    url: '/users/:id',
  });

  // Except
  const sessionRootRoutes = router.routes.filter(route => route.url.startsWith('/session'));
  const sessionNameRoute = sessionRootRoutes.find(route => route.name === 'new');
  expect(sessionNameRoute).toBeUndefined();
});

test('nodos-routing throws an error if schema is invalid', async () => {
  const routesData = await fs.readFile(`${__dirname}/__fixtures__/routesWithInvalidSchema.yml`);
  const routesMap = yml.safeLoad(routesData);

  expect(() => new Router(routesMap)).toThrowErrorMatchingSnapshot();
});
