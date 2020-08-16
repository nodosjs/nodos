import User from '../entities/User';
import Guest from '../entities/Guest';

export default async (request, _response, done) => {
  const { currentUser } = request.session;
  const renewUser = currentUser && !currentUser.isGuest
    ? await User.query().findById(currentUser.id)
    : new Guest();

  request.session.currentUser = renewUser;
  done();
};
