const path = require('path');
const status = require('statuses');

/**
 * A Response object
 *
 * @param {Object} options
 * @param {string} options.templateName Name of template
 * @param {string} options.templateDir Name of dir with templates
 */
class Response {
  constructor({ templateName, templateDir }) {
    this.templateName = templateName;
    this.templateDir = templateDir;
    this.responseType = 'rendering';
    this.headers = {};
    this.locals = {};
    this.code = 200;
    this.body = null;
  }

  /**
   * Set http status code
   *
   * @param {(integer|string)} code
   * @example res.head(200);
   * @example res.head('forbidden');
   */
  head(code) {
    this.responseType = 'code';
    this.code = Number.isInteger(code) ? code : status(code);
  }

  /**
   * Set http body
   *
   * @param {string} body
   * @example res.body('hello from Hexlet');
   */
  send(body) {
    this.responseType = 'sending';
    this.body = body;
  }

  /**
   * Set location and code for redirect
   *
   * @param {string} url Location for redirect
   * @param {string|integer} code
   * @example res.redirectTo('https://ru.hexlet.io', 301);
   */
  redirectTo(url, code = 302) {
    this.head(code);
    this.redirectUrl = url;
    this.responseType = 'redirect';
  }

  /**
   * Set http header
   *
   * @param {string} key
   * @param {string} value
   * @example res.setHeader('location', 'https://code-basics.com');
   */
  setHeader(key, value) {
    this.headers[key.toLowerCase()] = value;
  }

  /**
   * Render template and send it as a body of http response
   *
   * @param {object} locals Any data for template
   * @param {string} template Custom template name
   * @example render({ title: 'nodos is a power' });
   */
  render(locals = {}, template = this.templateName) {
    this.responseType = 'rendering';
    this.locals = locals;
    this.templateName = template;
  }

  template() {
    return path.join(this.templateDir, this.templateName);
  }
}

module.exports = Response;
