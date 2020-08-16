import crypto from 'crypto';
import User from '../entities/User';

export const build = () => {};

export const create = async (request, response, { router }) => {
  const { body: { user: { email, password } } } = request;
  const user = await User.query().findOne({ email });

  if (!user) {
    response.head(401);
    response.redirectTo(router.routePath('buildSession'));
    return;
  }

  const passwordDigest = crypto.createHash('sha256').update(password).digest('hex');

  if (passwordDigest !== user.passwordDigest) {
    response.head(401);
    response.redirectTo(router.routePath('buildSession'));
    return;
  }

  request.session.currentUser = user;
  response.redirectTo(router.routePath('root'));
};

export const destroy = async (request, response, { router }) => {
  request.destroySession(() => response.redirectTo(router.routePath('root')));
};

