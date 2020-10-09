module.exports = async (action, request, response, app) => {
  if (!app.isTest()) {
    response.addLocal('csrfToken', request.csrfToken());
  }

  await action();
};
