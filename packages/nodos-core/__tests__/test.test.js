/**
 * @jest-environment ./packages/nodos/src/testEnvironments/IntegrationEnvironment
 */

test('nodos', async () => {
  const response = await global.get('/users');
  expect(response).toMatchObject({ statusCode: 200 });
});
