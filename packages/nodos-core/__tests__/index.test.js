import { nodos } from '../src';


let app;

beforeAll(async () => {
  app = await nodos(`${__dirname}/__fixtures__/app`);
});

test('GET /', async () => {
  const result = await app.get('/');
  expect(result).toMatchObject({ statusCode: 200 });
});

test('GET /users', async () => {
  const result = await app.get('/users');
  expect(result).toMatchObject({ statusCode: 200, body: '<h1>hello</h1>' });
});

test('GET /users/:id', async () => {
  const result = await app.get('/users/1');
  expect(result).toMatchObject({ statusCode: 200, body: '<h3>tom</h3>' });
});

test('POST /users fail', async () => {
  const result = await app.post('/users');
  expect(result).toMatchObject({ statusCode: 200, body: '' });
});

test('POST /users success', async () => {
  const result = await app.post('/users', { params: { user: {} } });
  expect(result).toMatchObject({ statusCode: 302 });
});

test('DELETE /users success', async () => {
  const result = await app.delete('/users/1');
  expect(result).toMatchObject({ statusCode: 302 });
});

test('GET /articles', async () => {
  const result = await app.get('/articles');
  expect(result).toMatchObject({ statusCode: 200, body: '<h2>hello</h2>' });
});

test('GET /posts', async () => {
  const result = await app.get('/posts');
  // expect(result).toMatchObject({ statusCode: 500 });
  expect(result.body).toContain('errno');
});
