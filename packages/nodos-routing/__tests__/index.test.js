import draw from '../src';

test('router', async () => {
  const router = await draw(`${__dirname}/__fixtures__/routes.yml`);
  const request = {
    method: 'get',
    path: '/users',
  };
  const route = router.recognize(request);
  expect(route).toMatchObject({
    method: 'get',
    params: {},
  });
});
