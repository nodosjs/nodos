export const index = async (_request, response, { container }) => {
  const { db } = container;
  const users = await db.user.findMany();
  console.log(users);

  response.render({ users });
};

export const build = (_request, response, { container }) => {
  const { db } = container;
  const user = db.user
  console.log(user);
  response.render({ user });
};

export const create = async (request, response, { router, container }) => {
  const { db } = container;
  const userData = request.body.user;

  try {
    const user = await db.user.create({ data: userData });
    response.redirectTo(router.route('users'));
    request.flash('success', `User ${user.email} successfully created`);
  } catch (e) {
    console.log(request.body);
    console.log(e);
    console.log(userData.email);
    request.flash('danger', 'Something went wrong on creating new user');
    response.render({ user: userData }, 'build');
  }
};
