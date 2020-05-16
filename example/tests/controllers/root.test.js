test('example/', async () => {
  const response = await app.get('/');
  expect(response).toMatchObject({ statusCode: 200 });
});
