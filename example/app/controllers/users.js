import User from '../entities/User.js';

export const index = async (_request, response) => {
  const users = await User.query();

  response.render({ users });
};

export const build = () => {
};

export const edit = () => {
};

export const show = async (request, response) => {
  const user = await User.query()
    .findById(request.params.id)
    .throwIfNotFound();

  response.render({ user });
};

export const create = async (request, response, { router }) => {
  const user = await User.query().insert(request.body.user);

  if (user instanceof User) { // validation
    response.redirectTo(router.route('users'));
    request.flash('success', 'User successfully created');
    return;
  }

  request.flash('danger', 'Something went wrong on creating new user');
  response.render({ user }, 'build');
};

export const destroy = async (request, response, { router }) => {
  const { id: userId } = request.params;
  if (userId) { // validation
  }

  await User.query().deleteById(id);

  response.redirectTo(router.route('users'));
};
