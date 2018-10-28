import IntegrationEnvironment from '../src/testEnvironments/IntegrationEnvironment';

test('nodos/testEnvironment', async () => {
  const config = {
    rootDir: `${__dirname}/__fixtures__/app`,
    testEnvironmentOptions: {
    },
  };
  const env = new IntegrationEnvironment(config);
  await env.setup();
  expect(env.global.get).not.toBeUndefined();
});
