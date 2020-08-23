import User from '../entities/User';
import Guest from '../entities/Guest';

export default async (action, request, response) => {
  const { userId } = request.session;
  const currentUser = userId
    ? await User.query().findById(userId)
    : new Guest();

  request.currentUser = currentUser;
  response.addLocal('currentUser', currentUser);
  await action();
};
