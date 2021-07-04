test('example/users', async () => {
  const response = await app.get('/users');
  expect(response).toMatchObject({ statusCode: 200 });
});

test('example/users/build', async () => {
  const response = await app.get('/users/build');
  expect(response).toMatchObject({ statusCode: 200 });
});

test('example/users/create', async () => {
  const params = { user: { email: 'test2@test.com', name: 'Mila' } };
  const response = await app.post('/users', { params });
  expect(response).toMatchObject({ statusCode: 302 });
});

// test('example/users/edit', async () => {
//   const user = { id: 3 };
//   const response = await app.get(`/users/${user.id}/edit`);
//   expect(response).toMatchObject({ statusCode: 200 });
// });
