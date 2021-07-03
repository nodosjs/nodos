/* @ts-check */

import { promises as fs } from 'fs';
import urlJoin from 'url-join';
// import _ from 'lodash';
import yml from 'js-yaml'; // eslint-disable-line
import Router from '../index.js';

let router;

const host = 'http://site.com';
const mapping = [
  { expected: '', name: 'root', params: [] },
  { expected: '/api', name: 'apiRoot', params: [] },
  { expected: '/api/users', name: 'apiUsers', params: [] },
  { expected: '/api/users/build', name: 'buildApiUser', params: [] },
  { expected: '/api/users/toto', name: 'apiUser', params: ['toto'] },
  { expected: '/api/users/toto/edit', name: 'editApiUser', params: ['toto'] },
  { expected: '/api/users/toto/photo', name: 'apiUserPhoto', params: ['toto'] },
  { expected: '/api/users/toto/photo/edit', name: 'editApiUserPhoto', params: ['toto'] },
  { expected: '/test', name: 'testRoot', params: [] },
  { expected: '/users/3', name: 'user', params: [3] },
  { expected: '/session', name: 'session', params: [] },
  { expected: '/session/edit', name: 'editSession', params: [] },
  { expected: '/session/tokens', name: 'sessionTokens', params: [] },
  { expected: '/session/tokens/build', name: 'buildSessionToken', params: [] },
  { expected: '/session/tokens/5', name: 'sessionToken', params: [5] },
  { expected: '/session/tokens/5/edit', name: 'editSessionToken', params: [5] },
];

beforeAll(async () => {
  const routesData = await fs.readFile(`${__dirname}/../__fixtures__/routes.yml`);
  const routesMap = yml.load(routesData);
  router = new Router(routesMap, { host });
});

test.each(mapping)('router.route: $expected, $name, $params', ({ expected, name, params }) => {
  expect(router.route(name, ...params)).toBe(urlJoin(host, expected));
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
