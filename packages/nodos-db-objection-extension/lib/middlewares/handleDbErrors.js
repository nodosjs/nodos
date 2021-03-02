// @ts-check

const { NotFoundError } = require('objection');
/** @typedef { import('../http/Response') } Response */

/**
 *
 * @param {function} next
 * @param {Request} request
 * @param {Response} response
 */
module.exports = async (next, request, response) => {
  try {
    await next();
  } catch (e) {
    // if (!app.isProduction()) {
    //   throw e;
    // }

    if (e instanceof NotFoundError) {
      // response.head(404, 'Page not found!');
      response.notFound();
      return;
    }

    throw e;
  }
};
