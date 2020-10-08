module.exports = async (action, request, response) => {
  response.addLocal('csrfToken', request.csrfToken());
  await action();
};
