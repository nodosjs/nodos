export default async (action, request, response, app) => {
  const userId = request.session.get('userId');
  const currentUser = userId
    ? await container.db.user.findUnique({ where: { id: userId } })
    : null;

  request.currentUser = currentUser;
  response.addLocal('currentUser', currentUser);
  await action();
};
