module.exports = async (action, request, response) => {
  response.addLocal('csrfToken', request.fastifyRequest.csrfToken());
  await action();
};
