import User from '../entities/User.js';
// import Guest from '../entities/Guest.js';

export default async (action, request, response) => {
  const userId = request.session.get('userId');
  const currentUser = userId
    ? await User.query().findById(userId)
    : null;

  request.currentUser = currentUser;
  response.addLocal('currentUser', currentUser);
  await action();
};
