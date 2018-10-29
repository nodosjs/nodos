import { promises as fs } from 'fs';
import _ from 'lodash';
import yml from 'js-yaml';
import Router from '../src';

test('nodos-routing', async () => {
  const routesData = await fs.readFile(`${__dirname}/__fixtures__/routes.yml`);
  const routesMap = yml.safeLoad(routesData);
  const { routes } = new Router(routesMap);

  const expectedRoutes = [
    { name: 'index', url: '/api/users', method: 'get' },
    { name: 'new', url: '/api/users/new', method: 'get' },
    { name: 'create', url: '/api/users', method: 'post' },
    { name: 'show', url: '/api/users/:id', method: 'get' },
    { name: 'show', url: '/users/:id', method: 'get' },
    { name: 'show', url: '/session', method: 'get' },
    { name: 'update', url: '/session', method: 'patch' },
    { name: 'show', url: '/session/tokens/:id', method: 'get' },
    { name: 'index', url: '/articles', method: 'get' },
    { name: 'update', url: '/articles/:id', method: 'patch' },
    { name: 'index', url: '/articles/:article_id/comments', method: 'get' },
    { name: 'show', url: '/articles/:article_id/comments/:id', method: 'get' },
  ];

  const actualRoutes = routes
    .map(({ name, url, method }) => ({ name, url, method }))
    .filter(r => expectedRoutes.find(e => _.isEqual(e, r)));

  expect(actualRoutes).toEqual(expectedRoutes);

  // Only
  const userRootRoutes = routes.filter(route => route.url.startsWith('/users'));

  expect(userRootRoutes).toHaveLength(1);
  expect(userRootRoutes[0]).toMatchObject({
    method: 'get',
    name: 'show',
    url: '/users/:id',
  });

  // Except
  const sessionNewRoute = _.find(routes, { resourceName: 'session', name: 'new' });
  expect(sessionNewRoute).toBeUndefined();
});

test('nodos-routing throws an error if schema is invalid', async () => {
  const routesData = await fs.readFile(`${__dirname}/__fixtures__/routesWithInvalidSchema.yml`);
  const routesMap = yml.safeLoad(routesData);

  expect(() => new Router(routesMap)).toThrowErrorMatchingSnapshot();
});
