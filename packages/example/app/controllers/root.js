export default async (request, response) => {
  const { currentUser } = request;

  response.render({ currentUser });
};
