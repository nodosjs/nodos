import User from '../entities/User';

export const build = () => {};

export const create = async (request, response, { router }) => {
  const { body: { user: { email, password } } } = request;
  try {
    const user = await User.query()
      .findOne({ email })
      .throwIfNotFound({ message: 'User not found' });

    const isPasswordValid = await user.verifyPassword(password);

    if (!isPasswordValid) {
      response.head(422);
      response.redirectTo(router.routePath('buildSession'));
      return;
    }

    request.session.userId = user.id;
    response.redirectTo(router.routePath('root'));
  } catch ({ statusCode, message }) {
    response.head(statusCode);
    response.redirectTo(router.routePath('buildSession'));
  }
};

export const destroy = async (request, response, { router }) => {
  request.destroySession(() => response.redirectTo(router.routePath('root')));
};

