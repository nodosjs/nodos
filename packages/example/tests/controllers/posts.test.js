test('example/posts', async () => {
  const response = await app.get('/posts');
  expect(response).toMatchObject({ statusCode: 200 });
});
