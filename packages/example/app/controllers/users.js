import User from '../entities/User';

export const index = async (request, response, { db }) => {
  const users = await db.connection
    .getRepository(User)
    .find();
  // console.log(db.connection);
  // const users = [];

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

export const create = async (request, response, { db, router }) => {
  const user = new User(request.body.user);

  if (user instanceof Object) { // validation
    await db.connection
      .manager
      .save(user);
    response.redirectTo(router.routePath('users'));
    return;
  }

  response.render({ user }, 'build');
};

export const destroy = async (request, response, { db, router }) => {
  const { id: userId } = request.params;
  if (userId) { // validation
  }

  await db.connection
    .getRepository(User)
    .delete(userId);

  response.redirectTo(router.routePath('users'));
};
