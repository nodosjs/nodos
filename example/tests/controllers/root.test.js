/**
 * @jest-environment @nodosjs/application/dist/testEnvironments/IntegrationEnvironment
 */

test('example/', async () => {
  const response = await get('/');
  expect(response).toMatchObject({ statusCode: 200 });
});
