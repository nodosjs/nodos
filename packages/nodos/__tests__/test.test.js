/**
 * @jest-environment ./packages/nodos/src/testEnvironments/IntegrationEnvironment
 */

test('nodos', async () => {
  const response = await get('/users');
  expect(response).toMatchObject({ statusCode: 200 });
});
