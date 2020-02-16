import qs from 'qs';
import nodos from '../lib/nodos';

let app;

beforeEach(async () => {
  app = await nodos(`${__dirname}/../__fixtures__/app`, 'test');
  await app.start();
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
  const result = await app.post('/users', { params: { user: {} } });
  expect(result).toMatchObject({ statusCode: 200, body: '' });
});

test('POST /users success', async () => {
  const params = qs.stringify({ user: { id: 4, name: 'gogo' } });
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const result = await app.post('/users', { params, headers });
  expect(result).toMatchObject({ statusCode: 302 });

  const result2 = await app.get('/users/4');
  expect(result2).toMatchObject({ statusCode: 200 });
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
  expect(result).toMatchObject({ statusCode: 500 });
});

afterEach(async () => {
  await app.stop();
});
