import User from '../entities/User';

export const index = async (request, response, { db }) => {
  const users = await db.connection
    .getRepository(User)
    .find();

  response.render({ users });
};

export const build = (request, response) => {
};

export const edit = (request, response) => {
};

export const show = async (request, response, { db }) => {
  const user = await db.connection
    .getRepository(User)
    .findOne(request.params.id);
  if (!user) {
    response.head(404);
  }

  response.render({ user });
};

export const create = async (request, response, { db }) => {
  const user = new User(request.body.user);

  if (user instanceof Object) { // validation
    await db.connection
      .manager
      .save(user);
    response.redirectTo('/users');
    return;
  }

  response.render({ user }, 'build');
};

export const destroy = (request, response) => {
  const { id: userId } = request.params;
  if (userId) { // validation
  }

  response.redirectTo('/users');
};
