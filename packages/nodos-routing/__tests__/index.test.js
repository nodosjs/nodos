import { promises as fs } from 'fs';
import _ from 'lodash';
import yml from 'js-yaml';
import Router from '../lib';

let routesMap;

beforeAll(async () => {
  const routesData = await fs.readFile(`${__dirname}/__fixtures__/routes.yml`);
  routesMap = yml.safeLoad(routesData);
});

test('nodos-routing', async () => {
  const { routes } = new Router(routesMap, { host: 'http://site.com' });

  const expectedRoutes = [
    { actionName: 'index', url: '/', method: 'get' },
    { actionName: 'index', url: '/api/users', method: 'get' },
    { actionName: 'build', url: '/api/users/build', method: 'get' },
    { actionName: 'create', url: '/api/users', method: 'post' },
    { actionName: 'show', url: '/api/users/:id', method: 'get' },
    { actionName: 'show', url: '/session', method: 'get' },
    { actionName: 'update', url: '/session', method: 'patch' },
    { actionName: 'show', url: '/session/tokens/:id', method: 'get' },
    { actionName: 'index', url: '/articles', method: 'get' },
    { actionName: 'update', url: '/articles/:id', method: 'patch' },
    { actionName: 'index', url: '/articles/:article_id/comments', method: 'get' },
    { actionName: 'show', url: '/articles/:article_id/comments/:id', method: 'get' },
    { actionName: 'create', url: '/articles/:article_id/metadata', method: 'post' },
  ];

  const actualRoutes = routes
    .map(({ actionName, url, method }) => ({ actionName, url, method }))
    .filter(r => expectedRoutes.find(e => _.isEqual(e, r)));

  expect(actualRoutes).toEqual(expectedRoutes);
});

test('nodos-routing check only', async () => {
  const { routes } = new Router(routesMap, { host: 'http://site.com' });
  const userRootRoutes = routes.filter(route => route.url.startsWith('/users'));

  expect(userRootRoutes).toHaveLength(1);
  expect(userRootRoutes[0]).toMatchObject({
    method: 'get',
    actionName: 'show',
    url: '/users/:id',
  });
});

test('nodos-routing check except', async () => {
  const { routes } = new Router(routesMap, { host: 'http://site.com' });

  const sessionBuildRoute = _.find(routes, { resourceName: 'session', name: 'build' });
  expect(sessionBuildRoute).toBeUndefined();
});

test('nodos-routing route helpers should return correct url', async () => {
  const router = new Router(routesMap, { host: 'http://site.com' });
  const article = { id: 123 };
  const comment = { id: 321 };

  const rootPath = router.routePath('root');
  const expectedRootPath = '/';
  expect(rootPath).toBe(expectedRootPath);

  const apiRootPath = router.routePath('apiRoot');
  const expectedApiRootPath = '/api';
  expect(apiRootPath).toBe(expectedApiRootPath);

  const apiUsersPath = router.routePath('apiUsers');
  const expectedApiUsersPath = '/api/users';
  expect(apiUsersPath).toBe(expectedApiUsersPath);

  const buildArticlesPath = router.routePath('buildArticle');
  const expectedBuildArticlesPath = '/articles/build';
  expect(buildArticlesPath).toBe(expectedBuildArticlesPath);

  const articleCommentsPath = router.routePath('articleComments', article.id);
  const expectedArticleCommentsPath = `/articles/${article.id}/comments`;
  expect(articleCommentsPath).toBe(expectedArticleCommentsPath);

  const articleCommentPath = router.routePath('articleComment', article.id, comment.id);
  const expectedArticleCommentPath = `/articles/${article.id}/comments/${comment.id}`;
  expect(articleCommentPath).toBe(expectedArticleCommentPath);

  const articleCommentUrl = router.routeUrl('articleComment', article.id, comment.id);
  const expectedArticleCommentUrl = `http://site.com/articles/${article.id}/comments/${comment.id}`;
  expect(articleCommentUrl).toBe(expectedArticleCommentUrl);
});

test('nodos-routing throws an error if schema is invalid', async () => {
  const routesData = await fs.readFile(`${__dirname}/__fixtures__/routesWithInvalidSchema.yml`);
  const invalidRoutesMap = yml.safeLoad(routesData);

  expect(() => new Router(invalidRoutesMap)).toThrowErrorMatchingSnapshot();
});
