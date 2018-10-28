/**
 * @jest-environment @nodosjs/core/dist/testEnvironments/IntegrationEnvironment
 */

test('nodos', async () => {
  const response = await get('/users');
  expect(response).toMatchObject({ statusCode: 200 });
});
