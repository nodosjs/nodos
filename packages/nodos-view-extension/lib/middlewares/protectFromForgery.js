module.exports = async (action, request, response, app) => {
  if (app.config.csrf.enabled) {
    response.addLocal('csrfToken', request.csrfToken());
  }

  await action();
};
