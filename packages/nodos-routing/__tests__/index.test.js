/* @ts-check */

import { promises as fs } from 'fs';
import urlJoin from 'url-join';
// import _ from 'lodash';
import yml from 'js-yaml'; // eslint-disable-line
import Router from '../index.js';

let router;
let mapping;

const host = 'http://site.com';

beforeAll(async () => {
  const mappingData = await fs.readFile(`${__dirname}/../__fixtures__/expected.yml`);
  mapping = yml.load(mappingData);

  const routesData = await fs.readFile(`${__dirname}/../__fixtures__/routes.yml`);
  const routesMap = yml.load(routesData);
  router = new Router(routesMap, { host });
});

test('router should respect only and except', () => {
  expect(router.routes).toHaveLength(52);
});

// We can't use test.each with mapping
// it throws error "`.each` must be called with an Array or Tagged Template Literal."
// because it tries to setup test.each(mapping) before initialization within beforeAll finishes
test('router.route: $url, $name, $params', () => {
  mapping.forEach((options) => {
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
