module.exports = async (action, _request, response, app) => {
  if (app.config.csrf.enabled) {
    const token = await response.generateCsrf();
    response.addLocal('csrfToken', token);
  }
  await action();
};
