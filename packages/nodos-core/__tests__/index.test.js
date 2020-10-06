import { nodos } from '../index.js';

let app;

beforeEach(async () => {
  app = await nodos(`${__dirname}/../__fixtures__/site`, 'test');
  await app.initApp();
});

test('GET /', async () => {
  const result = await app.get('/');
  expect(result).toMatchObject({ statusCode: 200 });
});

test('GET /users', async () => {
  const result = await app.get('/users');
  const expected = '{"users":[{"id":1,"name":"tom"}]}';
  expect(result).toMatchObject({ statusCode: 200, body: expected });
});

test('GET /users/:id', async () => {
  const result = await app.get('/users/1');
  const expected = '{"user":{"id":1,"name":"tom"}}';
  expect(result).toMatchObject({ statusCode: 200, body: expected });
});

test('POST /users fail', async () => {
  const result = await app.post('/users', { params: { user: {} } });
  const expected = '{"user":{}}';
  expect(result).toMatchObject({ statusCode: 200, body: expected });
});

test('DELETE /users success', async () => {
  const result = await app.delete('/users/1');
  expect(result).toMatchObject({ statusCode: 302 });
});

test('GET /articles', async () => {
  const result = await app.get('/articles');
  expect(result).toMatchObject({ statusCode: 200, body: 'articles' });
});

test('GET /posts', async () => {
  const result = await app.get('/posts');
  expect(result).toMatchObject({ statusCode: 500 });
});

afterEach(async () => {
  await app.stop();
});
