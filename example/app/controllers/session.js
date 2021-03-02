import User from '../entities/User.js';

export const build = () => {};

export const create = async (request, response, { router }) => {
  const { body: { user: { email, password } } } = request;
  try {
    const user = await User.query()
      .findOne({ email })
      .throwIfNotFound();

    const isPasswordValid = await user.verifyPassword(password);

    if (!isPasswordValid) {
      request.flash('danger', `Wrong password for user ${email}`)
      response.redirectTo(router.route('buildSession'));
      return;
    }

    request.session.set('userId', user.id);
    request.flash('success', 'You are logged in!')
    response.redirectTo(router.route('root'));
  } catch (error) {
    // TODO add flash message after integrating flash message into core or view
    request.flash('danger', `No user with email ${email} was found`)
    response.redirectTo(router.route('buildSession'));
  }
};

export const destroy = async (request, response, { router }) => {
  request.session.delete()
  response.redirectTo(router.route('root'));
};
