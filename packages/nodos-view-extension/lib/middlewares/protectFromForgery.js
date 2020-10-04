module.exports = async (action, request, response) => {
  console.log({ request });
  response.addLocal('csrfToken', request.fastifyRequest.csrfToken());
  await action();
};
