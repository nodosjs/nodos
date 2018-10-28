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
    { name: 'index', url: '/articles', method: 'get' },
    { name: 'update', url: '/articles/:id', method: 'patch' },
  ];

  const actualRoutes = routes
    .map(({ handlers }) => handlers)
    .reduce((acc, handlers) => [...acc, ...handlers], [])
    .filter(r => expectedRoutes.find(e => _.isEqual(e, r)));

  expect(_.uniqWith(actualRoutes, _.isEqual)).toEqual(expectedRoutes);

  // Only
  const userRootRoutes = _.find(routes, { resourceName: 'users', path: '/' });

  expect(userRootRoutes.handlers).toHaveLength(1);
  expect(userRootRoutes.handlers[0]).toMatchObject({
    method: 'get',
    name: 'show',
    url: '/users/:id',
  });

  // Except
  const sessionRootRoutes = _.find(routes, { resourceName: 'session' });
  const sessionNewRoute = _.find(sessionRootRoutes, { name: 'new' });
  expect(sessionNewRoute).toBeUndefined();

  // Nested resources
  const { children } = _.find(routes, { resourceName: 'articles' });

  expect(children).toHaveLength(2);
  const [commentsResource, metadataResource] = children;
  expect(commentsResource.handlers).toHaveLength(8);
  expect(metadataResource.handlers).toHaveLength(6);
});

test('nodos-routing throws an error if schema is invalid', async () => {
  const routesData = await fs.readFile(`${__dirname}/__fixtures__/routesWithInvalidSchema.yml`);
  const routesMap = yml.safeLoad(routesData);

  expect(() => new Router(routesMap)).toThrowErrorMatchingSnapshot();
});
