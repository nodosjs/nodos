const path = require('path');
const status = require('statuses');

class Response {
  constructor({ templateName, templateDir }) {
    this.templateName = templateName;
    this.templateDir = templateDir;
    this.responseType = null;
    this.headers = {}
    this.locals = {};
    this.code = 200;
    this.body = null;

  }

  head(value) {
    this.responseType = 'code';
    this.code = status(value);
  }

  send(body) {
    this.responseType = 'sending';
    this.body = body;
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
