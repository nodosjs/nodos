module.exports = async (action, request, response) => {
  const flash = response.flash()
  console.log({ flash, f: request.session })
  response.addLocal('flash', flash || {});

  await action();
};
