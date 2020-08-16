import User from '../entities/User';

export default async (request, response) => {
  const { currentUser } = request.session;

  response.render({ currentUser });
};
