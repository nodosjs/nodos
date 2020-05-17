import IntegrationEnvironment from '../index.js';

test('nodos/testEnvironment', async () => {
  const config = {
    rootDir: `${__dirname}/../__fixtures__/app`,
    testEnvironmentOptions: {
    },
  };
  const env = new IntegrationEnvironment(config);
  await env.setup();
  expect(env.global.app).not.toBeUndefined();
  await env.teardown();
});
