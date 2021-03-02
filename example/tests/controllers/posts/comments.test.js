test('example/posts/comments', async () => {
  const post = { id: 1 }
  const response = await app.get(`/posts/${post.id}/comments`);
  expect(response).toMatchObject({ statusCode: 200 });
});
