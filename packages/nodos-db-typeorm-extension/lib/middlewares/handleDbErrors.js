// @ts-check

const { EntityNotFoundError } = require('typeorm/error/EntityNotFoundError');

module.exports = async (action, request, response) => {
  try {
    await action();
  } catch (e) {
    // if (!app.isProduction()) {
    //   throw e;
    // }

    if (e instanceof EntityNotFoundError) {
      // response.head(404, 'Page not found!');
      response.notFound();
      return;
    }

    throw e;
  }
};
