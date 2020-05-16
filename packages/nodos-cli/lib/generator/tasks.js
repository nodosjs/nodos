const Base = require('yeoman-generator');
const path = require('path');

module.exports = class Generator extends Base {
  constructor(args, opts) {
    super(args, opts);

    this.argument('type', { type: String, required: true });
    this.argument('name', { type: String, required: true });
  }

  default() {
    this.sourceRoot(path.resolve(__dirname, './templates'));
  }

  writing() {
    const { type, name } = this.options;

    // TODO: don't like switch case statement here, should be refactored to method dispatching
    // But Generator class is simply calls all custom methods one by one regardless of any condition
    switch (type) {
      case 'controller':
        this.fs.copy(
          this.templatePath(`controller.js`),
          this.destinationPath(`./app/controllers/${name}s.js`),
        );

        this.fs.copy(
          this.templatePath(`templates/`),
          this.destinationPath(`./app/templates/${name}s/`),
        );
        break;
      default:
        break;
    }
  }
};
