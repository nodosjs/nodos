const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');
const path = require('path');

export default class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.argument('appPath', { type: String, required: true });
  }

  default() {
    const { appPath } = this.options;

    mkdirp(appPath);
    this.sourceRoot(path.resolve(__dirname, '../src/templates'));
    this.destinationRoot(this.destinationPath(appPath));
  }

  writing() {
    const fileNames = [
      'babel.config.js',
      '.gitignore',
      'Makefile',
      'package.json',
      'package-lock.json',
      'config/database.yml',
      'config/routes.yml',
      'config/application.js',
      'config/environments/test.js',
      'config/environments/production.js',
      'config/environments/development.js',
      'bin/test',
      'bin/nodos',
      'app/entities/User.js',
      'app/controllers/users.js',
      'app/middlewares/setLocale.js',
      'app/templates/layouts/application.pug.html',
      'app/templates/users/index.marko',
      'app/templates/users/show.marko',
      'tests/controllers/users.test.js',
    ];

    fileNames.forEach((fileName) => {
      this.fs.copy(
        this.templatePath(fileName),
        this.destinationPath(fileName),
      );
    });
  }
}
