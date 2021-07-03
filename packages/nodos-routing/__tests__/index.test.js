/* @ts-check */

import { promises as fs } from 'fs';
import urlJoin from 'url-join';
// import _ from 'lodash';
import yml from 'js-yaml'; // eslint-disable-line
import Router from '../index.js';

let router;

const host = 'http://site.com';
// TODO: move to __fixtures__/expected.yaml
const mapping = [
  {
    controller: '/home', action: 'index', url: '', name: 'root', params: [],
  },
  {
    controller: '/api/home', action: 'index', url: '/api', name: 'apiRoot', params: [],
  },
  {
    controller: '/api/users', action: 'index', url: '/api/users', name: 'apiUsers', params: [],
  },
  {
    controller: '/api/users', action: 'build', url: '/api/users/build', name: 'buildApiUser', params: [],
  },
  {
    controller: '/api/users', action: 'show', url: '/api/users/toto', name: 'apiUser', params: ['toto'],
  },
  {
    controller: '/api/users', action: 'edit', url: '/api/users/toto/edit', name: 'editApiUser', params: ['toto'],
  },
  {
    controller: '/api/users/photos', action: 'show', url: '/api/users/toto/photo', name: 'apiUserPhoto', params: ['toto'],
  },
  {
    controller: '/api/users/photos', action: 'edit', url: '/api/users/toto/photo/edit', name: 'editApiUserPhoto', params: ['toto'],
  },
  {
    controller: '/test/home', action: 'index', url: '/test', name: 'testRoot', params: [],
  },
  {
    controller: '/users', action: 'show', url: '/users/3', name: 'user', params: [3],
  },
  {
    controller: '/sessions', action: 'show', url: '/session', name: 'session', params: [],
  },
  {
    controller: '/sessions', action: 'edit', url: '/session/edit', name: 'editSession', params: [],
  },
  {
    controller: '/sessions/tokens', action: 'index', url: '/session/tokens', name: 'sessionTokens', params: [],
  },
  {
    controller: '/sessions/tokens', action: 'build', url: '/session/tokens/build', name: 'buildSessionToken', params: [],
  },
  {
    controller: '/sessions/tokens', action: 'show', url: '/session/tokens/5', name: 'sessionToken', params: [5],
  },
  {
    controller: '/sessions/tokens', action: 'edit', url: '/session/tokens/5/edit', name: 'editSessionToken', params: [5],
  },
];

beforeAll(async () => {
  const routesData = await fs.readFile(`${__dirname}/../__fixtures__/routes.yml`);
  const routesMap = yml.load(routesData);
  router = new Router(routesMap, { host });
});

test('router should respect only and except', () => {
  expect(router.routes).toHaveLength(49);
});

test.each(mapping)('router.route: $url, $name, $params', (options) => {
  const {
    url, controller, action, name, params,
  } = options;

  expect(router.route(name, ...params)).toBe(urlJoin(host, url));

  const route = router.routes.find((r) => name === r.name);
  expect(route).toMatchObject({
    actionName: action,
    controllerPath: controller,
  });
  // const expectedRoutes = [
  //   { actionName: 'index', url: '/', method: 'get' },
  //   { actionName: 'index', url: '/api/users', method: 'get' },
  //   { actionName: 'build', url: '/api/users/build', method: 'get' },
  //   { actionName: 'create', url: '/api/users', method: 'post' },
  //   { actionName: 'show', url: '/api/users/:id', method: 'get' },
  //   { actionName: 'show', url: '/session', method: 'get' },
  //   { actionName: 'update', url: '/session', method: 'patch' },
  //   { actionName: 'show', url: '/session/tokens/:id', method: 'get' },
  //   { actionName: 'index', url: '/articles', method: 'get' },
  //   { actionName: 'update', url: '/articles/:id', method: 'patch' },
  //   { actionName: 'index', url: '/articles/:article_id/comments', method: 'get' },
  //   { actionName: 'show', url: '/articles/:article_id/comments/:id', method: 'get' },
  //   { actionName: 'create', url: '/articles/:article_id/metadata', method: 'post' },
  //   { actionName: 'index', url: '/test', method: 'get' },
  // ];

  // const actualRoutes = routes
  //   .map(({ actionName, url, method }) => ({ actionName, url, method }))
  //   .filter((r) => expectedRoutes.find((e) => _.isEqual(e, r)));

  // expect(sortRoutes(actualRoutes)).toEqual(sortRoutes(expectedRoutes));
});

test('nodos-routing throws an error if schema is invalid', async () => {
  const routesData = await fs.readFile(`${__dirname}/../__fixtures__/routesWithInvalidSchema.yml`);
  const invalidRoutesMap = yml.load(routesData);

  expect(() => new Router(invalidRoutesMap)).toThrow(/Routes schema is invalid/);
});

test('nodos-routing throws an error if routes key is missing', async () => {
  const routesData = await fs.readFile(`${__dirname}/../__fixtures__/scopeWithoutRoutes.yml`);
  const invalidRoutesMap = yml.load(routesData);

  expect(() => new Router(invalidRoutesMap, { host: 'http://site.com' })).toThrow(/Routes schema is invalid/);
});
