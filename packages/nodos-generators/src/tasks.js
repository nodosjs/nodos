const Generator = require('yeoman-generator');
const path = require('path');

export default class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    this.argument('type', { type: String, required: true });
    this.argument('name', { type: String, required: true });
  }

  default() {
    this.sourceRoot(path.resolve(__dirname, '../src/templates'));
  }

  writing() {
    const { type, name } = this.options;

    this.fs.copy(
      this.templatePath(`${type}.js`),
      this.destinationPath(`./app/${type}s/${name}s.js`),
    );
  }
}
