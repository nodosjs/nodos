import { promises as fs } from 'fs';
import yml from 'js-yaml';
import Router from '../src';

describe('format routes for console', () => {
  test('nodos-routing', async () => {
    const routesData = await fs.readFile(`${__dirname}/__fixtures__/routes.yml`);
    const routesMap = yml.safeLoad(routesData);
    const router = new Router(routesMap);

    const expectedOutput = `${
      'Verb   URI Pattern         Middlewares          \n'
      + 'GET    /api/users          [ accepts,setLocale ]\n'
      + 'GET    /api/users/new      [ accepts,setLocale ]\n'
      + 'POST   /api/users          [ accepts,setLocale ]\n'
      + 'GET    /api/users/:id      [ accepts,setLocale ]\n'
      + 'GET    /api/users/:id/edit [ accepts,setLocale ]\n'
      + 'PATCH  /api/users/:id      [ accepts,setLocale ]\n'
      + 'PUT    /api/users/:id      [ accepts,setLocale ]\n'
      + 'DELETE /api/users/:id      [ accepts,setLocale ]\n'
      + 'GET    /users/:id          [ accepts,setLocale ]\n'
      + 'GET    /session            [ accepts,setLocale ]\n'
      + 'GET    /session/edit       [ accepts,setLocale ]\n'
      + 'PATCH  /session            [ accepts,setLocale ]\n'
      + 'PUT    /session            [ accepts,setLocale ]\n'
      + 'DELETE /session            [ accepts,setLocale ]\n'
      + 'GET    /articles           [ accepts,setLocale ]\n'
      + 'GET    /articles/new       [ accepts,setLocale ]\n'
      + 'POST   /articles           [ accepts,setLocale ]\n'
      + 'GET    /articles/:id       [ accepts,setLocale ]\n'
      + 'GET    /articles/:id/edit  [ accepts,setLocale ]\n'
      + 'PATCH  /articles/:id       [ accepts,setLocale ]\n'
      + 'PUT    /articles/:id       [ accepts,setLocale ]\n'
      + 'DELETE /articles/:id       [ accepts,setLocale ]'}`;

    expect(router.formatRoutesForConsole()).toEqual(expectedOutput);
  });
});
