import User from '../entities/User';

export const build = () => {};

export const create = async (request, response, { router }) => {
  const { body: { user: { email, password } } } = request;
  try {
    const user = await User.query()
      .findOne({ email })
      .throwIfNotFound();

    const isPasswordValid = await user.verifyPassword(password);

    if (!isPasswordValid) {
      response.head(422);
      response.redirectTo(router.buildPath('buildSession'));
      return;
    }

    request.fastifyRequest.session.userId = user.id;
    response.redirectTo(router.buildPath('root'));
  } catch (error) {
    // TODO add flash message after integrating flash message into core or view
    response.redirectTo(router.buildPath('buildSession'));
  }
};

export const destroy = async (request, response, { router }) => {
  request.fastifyRequest.destroySession(() => response.redirectTo(router.buildPath('root')));
};

