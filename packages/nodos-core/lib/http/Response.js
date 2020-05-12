const path = require('path');
const status = require('statuses');

class Response {
  constructor({ templateName, templateDir }) {
    this.templateName = templateName;
    this.templateDir = templateDir;
    this.responseType = 'rendering';
    this.headers = {}
    this.locals = {};
    this.code = 200;

  }

  head(value) {
    this.code = status(value);
  }

  redirectTo(url, codeOrName = 302) {
    this.head(codeOrName);
    this.redirectUrl = url;
    this.responseType = 'redirect';
  }

  setHeader(key, value) {
    this.headers[key.toLowerCase()] = value;
  }

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
