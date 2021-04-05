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
  const user = new User(request.body.user);

  try {
    await user.validate();
    await user.save();
    response.redirectTo(router.route('users'));
    request.flash('success', 'User successfully created');
  } catch (e) {
    console.log(request.body);
    console.log(e);
    console.log(user.email);
    request.flash('danger', 'Something went wrong on creating new user');
    response.render({ user }, 'build');
  }
};
