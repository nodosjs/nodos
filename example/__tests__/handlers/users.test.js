/**
 * @jest-environment @nodosjs/core/dist/testEnvironments/IntegrationEnvironment
 */

test('example/users', async () => {
  const response = await get(route('users'));
  expect(response).toMatchObject({ statusCode: 200 });
});

test('example/users/new', async () => {
  const response = await get(route('newUser'));
  expect(response).toMatchObject({ statusCode: 200 });
});

test('example/users/edit', async () => {
  const user = { id: 3 };
  const response = await get(route('editUser', user.id));
  expect(response).toMatchObject({ statusCode: 200 });
});
