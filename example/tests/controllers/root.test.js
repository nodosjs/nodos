/**
 * @jest-environment @nodosjs/application/lib/testEnvironments/IntegrationEnvironment
 */

test('example/', async () => {
  const response = await get('/');
  expect(response).toMatchObject({ statusCode: 200 });
});
