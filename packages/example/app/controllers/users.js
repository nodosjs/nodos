import User from '../entities/User';

export const index = async (_request, response) => {
  const users = await User.query();

  response.render({ users });
};

export const build = () => {
};

export const edit = () => {
};

export const show = async (request, response) => {
  const user = await User.query().findById(request.params.id);
  if (!user) {
    response.head(404);
    return;
  }

  response.render({ user });
};

export const create = async (request, response, { router }) => {
  const user = await User.query().insert(request.body.user);

  if (user instanceof User) { // validation
    response.redirectTo(router.buildPath('users'));
    return;
  }

  response.render({ user }, 'build');
};

export const destroy = async (request, response, { router }) => {
  const { id: userId } = request.params;
  if (userId) { // validation
  }

  await User.query().deleteById(id);

  response.redirectTo(router.buildPath('users'));
};
