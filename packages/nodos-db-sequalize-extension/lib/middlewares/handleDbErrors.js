// @ts-check

module.exports = async (action, request, response, app) => {
  try {
    await action();
  } catch (e) {
    if (!app.isProduction()) {
      throw e;
    }

    // if (e instanceof EntityNotFoundError) {
    //   // response.head(404, 'Page not found!');
    //   response.notFound();
    //   return;
    // }

    throw e;
  }
};
