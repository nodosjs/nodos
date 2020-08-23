// @ts-check

const { NotFoundError } = require('objection');
/** @typedef { import('../http/Response') } Response */

/**
 *
 * @param {function} action
 * @param {Request} request
 * @param {Response} response
 */
module.exports = async (action, request, response) => {
  try {
    await action();
  } catch (e) {
    // FIXME only for production
    // if (!container.app.isProduction) {
    //   throw e;
    // }

    if (e instanceof NotFoundError) {
      response.head(404, 'Page not found!');
    }
  }
};
