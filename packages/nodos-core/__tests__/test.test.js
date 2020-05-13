import IntegrationEnvironment from '../lib/testEnvironments/IntegrationEnvironment.js';

test('nodos/testEnvironment', async () => {
  const config = {
    rootDir: `${__dirname}/../__fixtures__/app`,
    testEnvironmentOptions: {
    },
  };
  const env = new IntegrationEnvironment(config);
  await env.setup();
  expect(env.global.get).not.toBeUndefined();
  await env.teardown();
});
