module.exports = async (action, request, response) => {
  response.addLocal('flash', response.flash() || {});

  await action();
};
